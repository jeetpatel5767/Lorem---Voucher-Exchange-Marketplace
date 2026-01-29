"use client"; // If using Next.js

import React from "react";
import { motion } from "framer-motion";
import "./process.css";
import couponGif from "../../assets/Coupon.gif";

const Process: React.FC = () => {
  return (
    <div className="process-container">
      {/* Heading */}
      <motion.h1
        className="process-heading"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }} // Reverses on scroll up
      >
        How to use <span className="process-heading-span">Lorem</span> in <br />
        the best way
      </motion.h1>

      {/* Process Layout */}
      <div className="process-content">
        {/* Left Section (Points 1-3) */}
        <div className="points-section">
          {[
            { num: "01", title: "Browse Vouchers", desc: "Find vouchers listed by other users" },
            { num: "02", title: "Send a Request", desc: "Propose an exchange for the voucher you like." },
            { num: "03", title: "Receive Requests", desc: "Get notified when someone sends you an offer." }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="process-card left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <h2 className="process-number top-left">{item.num}</h2>
              <div className="process-text">
                {item.title}
                <p className="process-description">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center GIF */}
        <motion.div
          className="gif-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <img src={couponGif} alt="Coupon" />
        </motion.div>

        {/* Right Section (Points 4-6) */}
        <div className="points-section">
          {[
            { num: "04", title: "Explore Alternates", desc: "Browse the requester’s vouchers and propose an alternate exchange." },
            { num: "05", title: "Mutual Agreement", desc: "Both users must accept the exchange for it to proceed." },
            { num: "06", title: "Receive Codes", desc: "Instantly get each other’s voucher codes after acceptance." }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="process-card right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <h2 className="process-number top-right">{item.num}</h2>
              <div className="process-text">
                {item.title}
                <p className="process-description">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;
