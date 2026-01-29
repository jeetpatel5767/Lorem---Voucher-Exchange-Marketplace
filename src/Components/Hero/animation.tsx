import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "./hero"; // Your existing Hero component
import "./hero.css";

const HeroAnimation: React.FC = () => {
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    // Disable scrolling during animation
    document.body.style.overflow = "hidden";
    
    setTimeout(() => {
      setShowHero(true);
      document.body.style.overflow = "auto"; // Enable scrolling after animation
    }, 4000); // Adjust time to match animation duration
  }, []);

  return (
    <div className="hero-container">
      {!showHero ? (
        <div className="intro-animation">
          {/* 'Lorem' Text Animation */}
          <motion.h1
            className="animated-lorem"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            Lorem
          </motion.h1>

          {/* Loader Under Text */}
          <motion.div
            className="loader-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, repeat: 2, repeatType: "reverse" }}
          />

          {/* Shrinking Animation */}
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 2 }}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero />
        </motion.div>
      )}
    </div>
  );
};

export default HeroAnimation;
