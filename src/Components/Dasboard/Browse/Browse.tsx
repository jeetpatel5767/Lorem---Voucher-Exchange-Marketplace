import React, { useState, useEffect } from "react";
import { Voucher } from "../../../types";
import "./Browse.css";
import BrowseInfo from "../BrowseInfo/BrowseInfo";

// Create a new service for fetching all available vouchers
const fetchAllVouchers = async (): Promise<Voucher[]> => {
  const response = await fetch("http://localhost:8080/api/vouchers/available");
  
  if (!response.ok) {
    throw new Error('Failed to fetch vouchers');
  }

  return await response.json();
};

const Browse = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVouchers = async () => {
      try {
        setLoading(true);
        const fetchedVouchers = await fetchAllVouchers();
        setVouchers(fetchedVouchers);
        setError(null);
      } catch (err) {
        console.error("Error fetching vouchers:", err);
        setError(err instanceof Error ? err.message : "Failed to load vouchers");
      } finally {
        setLoading(false);
      }
    };

    loadVouchers();
  }, []);

  const handleViewClick = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
  };

  if (loading) {
    return (
      <div className="browse-container">
        <h1>Browse Offers</h1>
        <div className="loading-message">Loading offers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="browse-container">
        <h1>Browse Offers</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="browse-container">
      <h1>Browse Offers</h1>

      <div className="listed-cards">
        <div className="listed-cards-container">
          {vouchers.length === 0 ? (
            <div className="no-vouchers-message">
              No available vouchers at the moment.
            </div>
          ) : (
            vouchers.map((voucher) => (
              <div className="listed-card" key={voucher.id}>
                <div className="listed-image"></div>
                <div className="listed-content">
                  <h3 className="listed-title">{voucher.title}</h3>
                  
                  <p className="listed-date">
                    Status: {voucher.status}
                    <br />
                    Expires: {new Date(voucher.expirationDate).toLocaleDateString()}
                  </p>
                  <div className="listed-footer">
                    <button
                      className="listed-button"
                      onClick={() => handleViewClick(voucher)}
                    >
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedVoucher && (
        <BrowseInfo 
          onClose={() => setSelectedVoucher(null)}
          voucherData={selectedVoucher}
        />
      )}
    </div>
  );
};

export default Browse;