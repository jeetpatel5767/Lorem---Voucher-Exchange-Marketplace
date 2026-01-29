import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import image3 from '../../assets/1.png';
import "./faq.css";

const faqs = [
  {
    question: "Is my personal and payment information secure?",
    answer: "Yes! We use advanced encryption and follow strict security practices to protect your data. Your information is safe with us.",
  },
  {
    question: "Can I exchange vouchers or tokens from any brand or platform?",
    answer: "Yes! Most brands and platforms are supported. List your voucher/token, and others can request an exchange.",
  },
  {
    question: "What happens if I encounter an issue with an exchange?",
    answer: "Contact our support team via the Help Center. We’ll assist you in resolving any issues quickly.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="faq-container"
      initial={{ opacity: 0, y: 50 }} // Initial state (hidden)
      whileInView={{ opacity: 1, y: 0 }} // Animate when in view
      transition={{ duration: 0.8, ease: "easeInOut" }} // Animation settings
      viewport={{ once: false }} // Animate every time the section comes into view
    >
      {/* Left Side: Image */}
      <motion.div
        className="faq-image-container"
        initial={{ opacity: 0, x: -50 }} // Initial state (hidden)
        whileInView={{ opacity: 1, x: 0 }} // Animate when in view
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }} // Animation settings
        viewport={{ once: false }} // Animate every time the section comes into view
      >
        <img src={image3} alt="FAQ" className="faq-image" />
      </motion.div>

      {/* Right Side: FAQ Section */}
      <motion.div
        className="faq-content"
        initial={{ opacity: 0, x: 50 }} // Initial state (hidden)
        whileInView={{ opacity: 1, x: 0 }} // Animate when in view
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }} // Animation settings
        viewport={{ once: false }} // Animate every time the section comes into view
      >
        <h2 className="faq-title">
          Get every single <br /> answer
        </h2>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                className={`faq-item ${isOpen ? "open" : ""}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                role="button"
                aria-expanded={isOpen}
                initial={{ opacity: 0, y: 50 }} // Initial state (hidden, starts from the bottom)
                whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 * index }} // Animation settings with delay
                viewport={{ once: false }} // Animate every time the section comes into view
              >
                <div className="faq-question">
                  <p>{faq.question}</p>
                  {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="faq-answer-container"
                >
                  {isOpen && <p className="faq-answer">{faq.answer}</p>}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}