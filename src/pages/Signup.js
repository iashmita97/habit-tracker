import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState(""); // ✅ added name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful ✅");

      // go to login
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed ❌");
    }
  };

  return (
    <div className="container center">
      <h1 className="heading-3d">Sign Up</h1>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Create Account</button>
    </div>
  );
};

export default Signup;