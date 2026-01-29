import "./VoucherInfo.css";
import { Voucher } from '../../../types';

interface VoucherInfoProps {
  onClose: () => void;
  voucherData: Voucher | null;
}

const VoucherInfo = ({ onClose, voucherData }: VoucherInfoProps) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? "N/A" 
        : date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
    } catch {
      return "N/A";
    }
  };

  if (!voucherData) {
    return null;
  }

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
              <strong>Status:</strong> {voucherData.status}
            </p>
            <p className="voucher-info">
              <strong>Expires On:</strong> {formatDate(voucherData.expirationDate)}
            </p>
           
          </div>
          <div className="voucher-description-container">
            <h4 className="voucher-description">Description:</h4>
            <p className="voucher-description">
              {voucherData.description}
            </p>
          </div>
          <div className="code-display">
            <span className="code-label">Voucher Code:</span>
            <span className="code-value">{voucherData.voucherCode}</span>
          </div>
          <button className="voucher-close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherInfo;