import { useState, useEffect } from "react";
import axios from "axios";
import "./Notification.css";
import { useNavigate } from "react-router-dom";
import NotificationInfo from "../NotificationInfo/NotificationInfo";

interface VoucherRequest {
  id: number;
  title: string;
  voucherId: string;
  requesterUsername: string;
  requesterUserId: number;
  voucherTitle: string;
  voucherDescription: string;
  status: "PENDING" | "ACCEPTED";
  requestDate: string;
  responseDate?: string;
}

interface VoucherDetails {
  id: number;
  title: string;
  description: string;
}

const Notification = () => {
  const navigate = useNavigate();
  const [voucherRequests, setVoucherRequests] = useState<VoucherRequest[]>([]);
  const [voucherDetails, setVoucherDetails] = useState<{ [key: number]: VoucherDetails }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<VoucherRequest | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null); // Store current username

  // Fetch current user and voucher requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("currentUser") || "null");
        const loginTimestamp = localStorage.getItem("loginTimestamp");

        if (!userData || !loginTimestamp || (Date.now() - parseInt(loginTimestamp)) > 24 * 60 * 60 * 1000) {
          navigate("/Login");
          return;
        }

        setCurrentUser(userData.username); // Set current username

        const response = await axios.get(
          `http://localhost:8080/api/voucher-requests/owner/${userData.username}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        setVoucherRequests(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleViewClick = (request: VoucherRequest) => {
    setSelectedRequest(request);
  };

  const handleClosePopup = () => {
    setSelectedRequest(null);
  };

  if (loading) {
    return <div className="notification-container">Loading...</div>;
  }

  if (error) {
    return <div className="notification-container error">{error}</div>;
  }

  return (
    <div className="notification-container">
      <h1>Notifications</h1>

      <div className="exchange-cards-container">
        {voucherRequests.map((request) => (
          <div className="exchange-card" key={request.id}>
            <div className="rectangle-placeholder"></div>
            <div className="exchange-content">
              <h3 className="exchange-title">For: {request.title || "Loading..."}</h3>
              <p className="exchange-user">By: {request.requesterUsername}</p>
              <button className="exchange-button" onClick={() => handleViewClick(request)}>
                View Account for Exchange
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRequest && currentUser && (
        <NotificationInfo
          request={{
            id: selectedRequest.id,
            title: selectedRequest.title || "No Title",
            voucherId: selectedRequest.voucherId || "",
            requesterUsername: selectedRequest.requesterUsername || "Unknown",
            requesterUserId: selectedRequest.requesterUserId,
            voucherTitle: selectedRequest.voucherTitle,
            voucherDescription: selectedRequest.voucherDescription,
            status: selectedRequest.status || "PENDING",
            requestDate: selectedRequest.requestDate || "",
            responseDate: selectedRequest.responseDate || "",
          }}
          currentUser={currentUser} // Pass current username to NotificationInfo
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Notification;