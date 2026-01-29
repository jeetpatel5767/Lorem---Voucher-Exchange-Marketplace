import React, { useState } from "react";
import { createVoucher } from "../../../services/voucherService";
import "./Form.css";


interface FormProps {
  onClose: () => void;
  currentUsername: string; 
}

const Form = ({ onClose, currentUsername }: FormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    voucherCode: "",
    expirationDate: "",
    status: "ACTIVE" // Already included here
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.voucherCode.trim()) return "Voucher code is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.expirationDate) return "Expiration date is required";
    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }
    
    setLoading(true);
    setError("");
  
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        voucherCode: formData.voucherCode,
        expirationDate: formData.expirationDate, // Just the date now, no time
        status: "ACTIVE"
      };
      
      console.log('Final payload:', payload);
      
      await createVoucher(currentUsername, payload);
      alert("Voucher created successfully!");
      onClose();
    } catch (error) {
      console.error('Error details:', error);
      setError("Failed to create voucher. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2 className="form-title">Create New Voucher</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="voucher-content">
            <div className="voucher-info">
              <div className="input-group">
                <label>Voucher Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  required
                />
              </div>
              
              <div className="input-group">
                <label>Voucher Code*</label>
                <input
                  type="text"
                  name="voucherCode"
                  value={formData.voucherCode}
                  onChange={handleChange}
                  placeholder="Enter voucher code"
                  required
                />
              </div>         
          
              <div className="input-group">
                <label>Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  required
                />
              </div>
              
              <div className="input-group">
                <label>Expiration Date*</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>
          </div>

          <div className="button-group">
            <button 
              className="submit-button" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating...
                </>
              ) : "Create Voucher"}
            </button>
            <button 
              className="close-button" 
              type="button" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;