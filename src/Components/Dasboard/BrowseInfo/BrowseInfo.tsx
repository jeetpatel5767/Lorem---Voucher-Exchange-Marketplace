import "./BrowseInfo.css";
import { Voucher } from "../../../types";
import { useState } from "react";
import { getCurrentUser } from "../../../auth"; // Assuming you have this utility

interface BrowseInfoProps {
  onClose: () => void;
  voucherData: Voucher;
}

const BrowseInfo = ({ onClose, voucherData }: BrowseInfoProps) => {
  const [isSending, setIsSending] = useState(false);
  const API_BASE_URL = "http://localhost:8080/api/voucher-requests";

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? "Invalid date" 
        : date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
    } catch {
      return "Invalid date";
    }
  };

  const handleSendRequest = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.username) {
      alert("Please login to send requests");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/create/${encodeURIComponent(currentUser.username)}/${voucherData.id}`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}` // If using JWT
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send request");
      }

      const result = await response.json();
      alert(`Request sent successfully!`);
      onClose();
    } catch (error) {
      console.error("Error sending request:", error);
      alert(error instanceof Error ? error.message : "Failed to send request");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="voucher-image">
          <h3>Voucher Preview</h3>
        </div>

        <div className="voucher-details">
          <h2 className="voucher-title">{voucherData.title}</h2>
          <div className="voucher-meta">
            <p className="voucher-info">
              <strong>Listed By:</strong> {voucherData.ownerUsername || "Unknown User"}
            </p>
            <p className="voucher-info">
              <strong>Expires On:</strong> {formatDate(voucherData.expirationDate)}
            </p>
          </div>
          <p className="voucher-description">
            {voucherData.description}
          </p>
          
          <div className="voucher-actions">
            <button 
              className="send-button" 
              onClick={handleSendRequest}
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Request"}
            </button>
            <button className="BrowesInfo-close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseInfo;