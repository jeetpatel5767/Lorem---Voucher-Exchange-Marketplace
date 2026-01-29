import { useState } from "react";
import "./Accept.css";

interface VoucherData {
  id: string;
  title: string;
  description: string;
  expiryDate: string;
  userId: string;
}

interface RequestedVoucher {
  id: string;
  title: string;
  description?: string;
  ownerUsername: string;
  exchangeFor: string; 
  requesterUserId?: number; 
}

interface AcceptProps {
  onClose: () => void;
  voucherData: VoucherData;
  requestedVoucher: RequestedVoucher;
  currentUser: string;
}

const Accept = ({ onClose, voucherData, requestedVoucher, currentUser }: AcceptProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAcceptExchange = async () => {
    const requestBody = {
      currentUsername: currentUser,
      requesterUsername: requestedVoucher.ownerUsername,
      currentVoucherId: parseInt(requestedVoucher.id),
      requestedVoucherId: parseInt(voucherData.id),
    };
  
    console.log("Sending request:", JSON.stringify(requestBody, null, 2));
  
    setIsProcessing(true);
    try {
      const response = await fetch("http://localhost:8080/api/vouchers/exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        const text = await response.text(); // Read response as text
        throw new Error(text || "Unknown error");
      }
  
      if (!response.ok) {
        throw new Error(result?.message || `Server error: ${response.status} ${response.statusText}`);
      }
  
      alert(`Success! You exchanged for: ${requestedVoucher.exchangeFor}`);
      onClose();
    } catch (error) {
      console.error("Exchange error:", error);
      alert(`Failed to exchange for ${requestedVoucher.exchangeFor}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="accept-overlay" onClick={onClose}>
      <div className="accept-container" onClick={(e) => e.stopPropagation()}>
        <div className="voucher-image">
          <h3>{voucherData.title}</h3>
        </div>

        <div className="voucher-details">
          <h2 className="voucher-title">{voucherData.title}</h2>
          <p className="voucher-description">{voucherData.description}</p>
          
          <div className="exchange-info">
           
            <p><strong>You're Receiving:</strong> {requestedVoucher.exchangeFor}</p>
           
          </div>

          <div className="action-buttons">
            <button 
              className="Accept-button" 
              onClick={handleAcceptExchange}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Accept ${requestedVoucher.exchangeFor}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accept;
