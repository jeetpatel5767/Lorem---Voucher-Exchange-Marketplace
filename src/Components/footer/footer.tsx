import { motion } from "framer-motion";
import "./Footer.css";
import leftImage from "../../assets/2.png"; // Replace with your actual image path
import rightImage from "../../assets/1.png"; // Replace with your actual image path
import { FaFacebookF, FaTwitter, FaTelegramPlane, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 50 }} // Initial state (hidden)
      whileInView={{ opacity: 1, y: 0 }} // Animate when in view
      transition={{ duration: 0.8, ease: "easeInOut" }} // Animation settings
      viewport={{ once: false }} // Animate every time the footer comes into view
    >
      <div className="footer-container">
        {/* Left Section */}
        <motion.div
          className="footer-left"
          initial={{ opacity: 0, x: -50 }} // Initial state (hidden)
          whileInView={{ opacity: 1, x: 0 }} // Animate when in view
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }} // Animation settings
          viewport={{ once: false }} // Animate every time the footer comes into view
        >
          <img src={leftImage} alt="Left footer" className="footer-left-image" />
        </motion.div>

        {/* Center Section */}
        <motion.div
          className="footer-center"
          initial={{ opacity: 0, y: 50 }} // Initial state (hidden)
          whileInView={{ opacity: 1, y: 0 }} // Animate when in view
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }} // Animation settings
          viewport={{ once: false }} // Animate every time the footer comes into view
        >
          <h3 className="footer-lorem">Lorem</h3>
          <h2 className="footer-title">
            Unlock the value of <br /> what you already have.
          </h2>
          <div className="footer-icons">
            <motion.div
              className="icon-circle"
              initial={{ opacity: 0, y: 20 }} // Initial state (hidden)
              whileInView={{ opacity: 1, y: 0 }} // Animate when in view
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }} // Animation settings
              viewport={{ once: false }} // Animate every time the footer comes into view
            >
              <FaFacebookF className="icon" />
            </motion.div>
            <motion.div
              className="icon-circle"
              initial={{ opacity: 0, y: 20 }} // Initial state (hidden)
              whileInView={{ opacity: 1, y: 0 }} // Animate when in view
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.7 }} // Animation settings
              viewport={{ once: false }} // Animate every time the footer comes into view
            >
              <FaTwitter className="icon" />
            </motion.div>
            <motion.div
              className="icon-circle"
              initial={{ opacity: 0, y: 20 }} // Initial state (hidden)
              whileInView={{ opacity: 1, y: 0 }} // Animate when in view
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.8 }} // Animation settings
              viewport={{ once: false }} // Animate every time the footer comes into view
            >
              <FaTelegramPlane className="icon" />
            </motion.div>
            <motion.div
              className="icon-circle"
              initial={{ opacity: 0, y: 20 }} // Initial state (hidden)
              whileInView={{ opacity: 1, y: 0 }} // Animate when in view
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.9 }} // Animation settings
              viewport={{ once: false }} // Animate every time the footer comes into view
            >
              <FaDiscord className="icon" />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="footer-right"
          initial={{ opacity: 0, x: 50 }} // Initial state (hidden)
          whileInView={{ opacity: 1, x: 0 }} // Animate when in view
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }} // Animation settings
          viewport={{ once: false }} // Animate every time the footer comes into view
        >
          <img src={rightImage} alt="Right footer" className="footer-right-image" />
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0, y: 20 }} // Initial state (hidden)
        whileInView={{ opacity: 1, y: 0 }} // Animate when in view
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }} // Animation settings
        viewport={{ once: false }} // Animate every time the footer comes into view
      >
        <div className="footer-divider"></div>
        <p className="footer-copyright">Copyright & design by <span> @Monk </span>- 2025</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;