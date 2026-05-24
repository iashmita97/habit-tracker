import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔥 AUTOMATIC URL CONFIG (Aapka naya live Vercel URL yahan set kar diya hai)
  const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://habit-tracker-mu-ten-41.vercel.app"; 

  const handleLogin = async (e) => {
    e.preventDefault(); // Page ko refresh hone se rokne ke liye
    
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { // Route path ko sahi kiya
        email,
        password,
      });

      // ✅ save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      // ✅ go to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.error || "Login failed ❌");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login coming soon 🚀");
  };

  return (
    <div className="container center">
      <h1 className="heading-3d">Login</h1>

      {/* Inputs ko form tag mein wrap kiya taaki email check active ho sake */}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '300px' }}>
        <input
          type="email" // Email structure check active
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p>OR</p>

      <button className="google-btn" onClick={handleGoogleLogin}>
        Continue with Google
      </button>
    </div>
  );
};

export default Login;