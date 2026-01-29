"use client"; // Needed if using Next.js

import { motion } from "framer-motion";
import "./features.css";

const Features = () => {
  return (
    <motion.div 
      className="features-container"
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      viewport={{ once: false }} // Re-animates on every scroll
    >
      {/* Heading Animation */}
      <motion.h1 
        className="features-heading"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        Features We Provide
      </motion.h1>

      <div className="cards-container">
        {/* Top Row */}
        <div className="top-cards">
          {["Crypto management", "Crypto exchange"].map((text, index) => (
            <motion.div
              key={index}
              className="card top-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: false }}
            >
              {text}
            </motion.div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="bottom-cards">
          {["Real-time data", "Advanced trading", "Blockchain compliance"].map((text, index) => (
            <motion.div
              key={index}
              className="card bottom-card small"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: false }}
            >
              {text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling Text Animation */}
      <motion.div 
        className="scrolling-text"
        initial={{ opacity: 0.25, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1}}
        viewport={{ once: false }}
      >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </motion.div>
    </motion.div>
  );
};

export default Features;
