import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // ✅ save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      // ✅ go to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed ❌");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login coming soon 🚀");
  };

  return (
    <div className="container center">
      <h1 className="heading-3d">Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>OR</p>

      <button className="google-btn" onClick={handleGoogleLogin}>
        Continue with Google
      </button>
    </div>
  );
};

export default Login;