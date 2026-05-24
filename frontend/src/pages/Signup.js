import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔥 AUTOMATIC URL CONFIG (Aapka naya live Vercel URL yahan daal diya hai)
  const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://habit-tracker-mu-ten-41.vercel.app"; // Backend connection fix

  const handleSignup = async (e) => {
    e.preventDefault(); // Page ko refresh hone se rokne ke liye
    
    try {
      await axios.post(`${API_URL}/api/auth/register`, { // Backend route ke hisab se path fix kiya
        name,
        email,
        password,
      });

      alert("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      // Backend se jo validation error aayega, wo ab yahan alert mein dikhega
      alert(err.response?.data?.message || err.response?.data?.error || "Signup failed ❌");
    }
  };

  return (
    <div className="container center">
      <h1 className="heading-3d">Sign Up</h1>

      {/* Inputs ko form tag mein daal diya taaki html validation active ho sake */}
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '300px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required // Name zaroori hai
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email" // Isse browser khud check karega ki @ aur .com hai ya nahi
          placeholder="Email"
          value={email}
          required // Email zaroori hai
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required // Password zaroori hai
          minLength="6" // Kam se kam 6 characters zaroori hain safety ke liye
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;