import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./hero.css";

import image1 from "../../assets/2.png";
import image2 from "../../assets/1.png";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  const handleExploreClick = () => {
    navigate('/login');
  };

  const [showHeroContent, setShowHeroContent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      setShowHeroContent(true);
      document.body.style.overflow = "auto";
    }, 4000);
  }, []);

  return (
    <div className="hero">
      {!showHeroContent ? (
        <motion.div className="intro-animation">
          <motion.div
            className="intro-text"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {["L", "o", "r", "e", "m"].map((letter, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.5 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="loader-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3 }}
          />
        </motion.div>
      ) : (
        <>
          <motion.nav
            className="navbar"
            initial={{ y: -100, x: -700, opacity: 0 }}
            animate={{ y: 0, x: -700, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="nav-left">Lorem</div>
            <ul className="nav-center">
              <li>Features</li>
              <li>Token</li>
              <li>Process</li>
            </ul>
            <div className="nav-right">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="nav-button"
              onClick={handleExploreClick}
            >
              Explore
            </motion.button>
            </div>
          </motion.nav>

          <motion.div
            className="hero-content"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button className="info-button">HOW I WAS BUILT</button>
            <h1>Swap Share Save</h1>
            <h2>Your Vouchers, Your Way!</h2>
            <p>Your journey starts here. Explore amazing features and insights.</p>

            <div className="search-container">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input type="text" className="search-bar" placeholder="Search" />
                <button className="search-button">Search</button>
              </div>
            </div>
          </motion.div>

          <div className="image-container">
            {[image2, image1].map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                className="animated-image"
                animate={{
                  x: [0, Math.random() * 30 - 15],
                  y: [0, Math.random() * 30 - 15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
