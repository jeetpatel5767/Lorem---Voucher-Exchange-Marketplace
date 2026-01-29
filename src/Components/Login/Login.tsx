import "./login.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import image1 from "../../assets/2.png";
import image2 from "../../assets/1.png";
import image3 from "../../assets/image2.png";
import image4 from "../../assets/image3.png";
import { login } from "../../services/authService";



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const userData = await login(email, password);
      console.log("Login successful:", userData);
      
      // Store user data consistently as 'currentUser'
      localStorage.setItem('currentUser', JSON.stringify({
        id: userData.id,
        username: userData.username,
        email: userData.email
      }));
      
      // Add a login timestamp
      localStorage.setItem('loginTimestamp', Date.now().toString());
      
      navigate("/Dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <motion.img src={image1} alt="Corner Image 1" className="corner-image top-left"
        animate={{ x: [0, Math.random() * 30 - 15], y: [0, Math.random() * 30 - 15] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.img src={image2} alt="Corner Image 2" className="corner-image top-right"
        animate={{ x: [0, Math.random() * 30 - 15], y: [0, Math.random() * 30 - 15] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.img src={image3} alt="Corner Image 3" className="corner-image bottom-left"
        animate={{ x: [0, Math.random() * 30 - 15], y: [0, Math.random() * 30 - 15] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.img src={image4} alt="Corner Image 4" className="corner-image bottom-right"
        animate={{ x: [0, Math.random() * 30 - 15], y: [0, Math.random() * 30 - 15] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <button className="top-button">JOIN COMMUNITY</button>
      <h1 className="login-heading">Join a community that values <br /> sharing and saving.</h1>
      <div className="login-box">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button 
  className="login-button" 
  onClick={handleLogin}
  disabled={isLoading}
>
  {isLoading ? "Logging in..." : "Login"}
</button>
      </div>
    </div>
  );
};

export default Login;
