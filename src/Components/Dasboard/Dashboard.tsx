import { useState, useEffect } from "react";
import { FaPlus, FaHome, FaBell, FaCompass, FaSearch, FaUserCircle, FaGift, FaExchangeAlt, FaCheckCircle, FaSyncAlt } from "react-icons/fa";
import "./Dashboard.css";
import VoucherInfo from "./VoucherInfo/VoucherInfo";
import Notification from "./Notification/Notification";
import Form from "./Form/Form";
import Browse from "./Browse/Browse";
import { fetchUserVouchers } from '../../services/voucherService';
import { useNavigate } from "react-router-dom";

interface Voucher {
  id: number;
  title: string;
  description: string;
  voucherCode: string;
  expirationDate: string;
  ownerUsername: string;
  status: string;
}

interface UserData {
  username: string;
  email: string;
  id: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const userData = JSON.parse(localStorage.getItem('currentUser') || 'null');
      const loginTimestamp = localStorage.getItem('loginTimestamp');
      
      // Redirect to login if no valid session
      if (!userData || !loginTimestamp || 
          (Date.now() - parseInt(loginTimestamp)) > 24 * 60 * 60 * 1000) {
        navigate('/Login');
        return;
      }

      setUser(userData);
      setIsLoading(true);

      try {
        // Fetch vouchers for the current user
        const data = await fetchUserVouchers(userData.username);
        console.log("Fetched vouchers:", data); // Debugging
        setVouchers(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load vouchers");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const displayName = user?.username ? 
    user.username.charAt(0).toUpperCase() + user.username.slice(1) : 
    "User";

  // Stats calculation
  const listedVouchersCount = vouchers.length;
  const currentVouchersCount = vouchers.filter(v => 
    new Date(v.expirationDate) > new Date()
  ).length;
  const exchangedVouchersCount = vouchers.filter(v => 
    v.status === 'EXCHANGED'
  ).length;
  const pendingExchangesCount = vouchers.filter(v => 
    v.status === 'PENDING'
  ).length;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar shrunk">
        <div className="logo-container">
          <div className="logo">L</div>
        </div>

        <ul className="menu">
          <li
            className={`menu-item ${selectedItem === "Dashboard" ? "selected" : ""}`}
            onClick={() => setSelectedItem("Dashboard")}
          >
            <FaHome className="menu-icon" />
          </li>
          <li
            className={`menu-item ${selectedItem === "Notification" ? "selected" : ""}`}
            onClick={() => setSelectedItem("Notification")}
          >
            <FaBell className="menu-icon" />
          </li>
          <li
            className={`menu-item ${selectedItem === "Browse" ? "selected" : ""}`}
            onClick={() => setSelectedItem("Browse")}
          >
            <FaCompass className="menu-icon" />
          </li>
        </ul>

        {/* Add Voucher Button */}
        <div className="add-icon-container" onClick={() => setShowForm(true)}>
          <FaPlus className="add-icon" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar-content">
        <div className="search-bar">
          <span className="search-category">{selectedItem}</span>
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search" className="search-input" />
          </div>
          <FaUserCircle className="user-icon" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="main-content">
          {selectedItem === "Dashboard" && (
            <div className="dashboard-content">
              {/* Greeting Section */}
              <div className="name">
                <h1>Hey there 👋 <br />Good Morning</h1>
                <div className="user-name">
                  <span>{displayName}</span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="stats-container">
                <div className="stat-card">
                  <div className="icon-container">
                    <FaGift className="card-icon" />
                  </div>
                  <div className="stat-info">
                    <h3>Listed Vouchers</h3>
                    <p>{listedVouchersCount}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="icon-container">
                    <FaExchangeAlt className="card-icon" />
                  </div>
                  <div className="stat-info">
                    <h3>Current Vouchers</h3>
                    <p>{currentVouchersCount}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="icon-container">
                    <FaCheckCircle className="card-icon" />
                  </div>
                  <div className="stat-info">
                    <h3>Exchanged Vouchers</h3>
                    <p>{exchangedVouchersCount}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="icon-container">
                    <FaSyncAlt className="card-icon" />
                  </div>
                  <div className="stat-info">
                    <h3>Pending Exchanges</h3>
                    <p>{pendingExchangesCount}</p>
                  </div>
                </div>
              </div>

              {/* Vouchers List */}
              <div className="listed-cards">
                <h2>Your Listed Vouchers</h2>
                {isLoading ? (
                  <div className="loading-message">Loading vouchers...</div>
                ) : error ? (
                  <div className="error-message">{error}</div>
                ) : (
                  <div className="listed-cards-container">
                    {vouchers.length > 0 ? (
                      vouchers.map((voucher) => (
                        <div className="listed-card" key={voucher.id}>
                          <div className="listed-image"></div>
                          <div className="listed-content">
                            <h3 className="listed-title">{voucher.title}</h3>
                            <p className="listed-date">
                              Expires: {new Date(voucher.expirationDate).toLocaleDateString()}
                            </p>
                            <div className="listed-footer">
                              <button 
                                className="listed-button" 
                                onClick={() => {
                                  setIsModalOpen(true);
                                  setSelectedVoucher(voucher);
                                }}
                              >
                                <span>View</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-vouchers-message">
                        You haven't listed any vouchers yet.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedItem === "Notification" && <Notification />}
          {selectedItem === "Browse" && <Browse />}
        </div>
      </div>

      {/* Voucher Info Modal */}
      {isModalOpen && selectedVoucher && (
        <VoucherInfo 
          onClose={() => setIsModalOpen(false)} 
          voucherData={selectedVoucher} 
        />
      )}

      {/* Create Voucher Form */}
      {showForm && user && (
        <Form 
          onClose={() => setShowForm(false)} 
          currentUsername={user.username} 
        />
      )}
    </div>
  );
};

export default Dashboard;