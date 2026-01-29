import { useState, useEffect } from "react";
import "./NotificationInfo.css";
import Accept from "../Accept/Accept";

interface Voucher {
  id: string;
  title: string;
  description: string;
  expiryDate: string;
  points: number;
  userId: string;
}

interface VoucherRequest {
  id: number;
  title: string;
  requesterUserId: number; 
  requesterUsername: string;
  voucherId: string;
  voucherTitle: string;
  voucherDescription: string;
  status: "PENDING" | "ACCEPTED";
  requestDate: string;
  responseDate?: string;
}

interface NotificationInfoProps {
  request: VoucherRequest;
  currentUser: string; // Added new prop
  onClose: () => void;
}

const NotificationInfo = ({ request, currentUser, onClose }: NotificationInfoProps) => {
  const [userVouchers, setUserVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  useEffect(() => {
    const fetchUserVouchers = async () => {
      if (!request.requesterUsername) return; 

      try {
        const response = await fetch(`http://localhost:8080/api/vouchers/user/${request.requesterUsername}`);
        if (!response.ok) {
          throw new Error("Failed to fetch vouchers");
        }
        const vouchers: Voucher[] = await response.json();
        setUserVouchers(vouchers);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserVouchers();
  }, [request.requesterUserId]);

  const handleViewClick = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setShowAcceptModal(true);
  };

  const handleCloseAcceptModal = () => {
    setShowAcceptModal(false);
  };

  if (loading) {
    return (
      <div className="notification-overlay">
        <div className="notificationInfo-container">
          <div className="notification-content">
            <button className="NotificationInfo-close-button" onClick={onClose}>Close</button>
            <p>Loading vouchers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="notification-overlay">
        <div className="notificationInfo-container">
          <div className="notification-content">
            <button className="NotificationInfo-close-button" onClick={onClose}>Close</button>

            <div className="notification-header">
              <h2 className="notification-heading">
                Listed Vouchers from {request.requesterUsername}
              </h2>
              {/* Display current user if needed */}
              {/* <p>Current User: {currentUser}</p> */}
            </div>

            <div className="notification-cards-container">
              <div className="notification-cards-grid">
                {userVouchers.length > 0 ? (
                  userVouchers.map((voucher) => (
                    <div className="notification-listed-card" key={voucher.id}>
                      <div className="notification-listed-content">
                        <h3 className="notification-listed-title">{voucher.title}</h3>
                        <p className="notification-listed-date">
                          Expires: {new Date(voucher.expiryDate).toLocaleDateString()}
                        </p>
                        <div className="notification-listed-footer">
                          <button className="notification-listed-button" onClick={() => handleViewClick(voucher)}>
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No vouchers listed by this user</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAcceptModal && selectedVoucher && (
        <Accept
          onClose={handleCloseAcceptModal}
          voucherData={{
            id: selectedVoucher.id,
            title: selectedVoucher.title,
            description: selectedVoucher.description,
            userId: selectedVoucher.userId,
            expiryDate: selectedVoucher.expiryDate,
          }}
          requestedVoucher={{
            id: request.voucherId,
            title: request.voucherTitle,
            description: request.voucherDescription,
            ownerUsername: request.requesterUsername,
            exchangeFor: request.title,
            requesterUserId: request.requesterUserId,
          }}
          currentUser={currentUser} // Pass currentUser to Accept component
        />
      )}
    </>
  );
};

export default NotificationInfo;