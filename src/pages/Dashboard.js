import React, { useEffect, useState } from "react";
import axios from "axios";
import HabitCard from "../components/HabitCard";
import EmptyGraph from "../components/EmptyGraph";
import { FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
    else {
      fetchHabits();
      fetchUser();
    }
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get("http://localhost:5000/", {
        headers: { Authorization: token },
      });
      setHabits(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: token },
      });
      setUser(res.data);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  const addHabit = async () => {
    if (!name) return;
    try {
      await axios.post(
        "http://localhost:5000/add",
        { name },
        { headers: { Authorization: token } }
      );
      setName("");
      fetchHabits();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // 🔥 LOGOUT UPDATED TO CALL BACKEND
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { headers: { Authorization: token } }
      );
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("token");
    navigate("/login");
  };

  const totalActiveDays = habits.reduce(
    (total, habit) => total + Object.keys(habit.dates || {}).length,
    0
  );

  const getRankData = (days) => {
    if (days <= 5) return { name: "🐣 Beginner", color: "#00ff6a" };
    if (days <= 15) return { name: "🔰 Learner", color: "#a3ff00" };
    if (days <= 30) return { name: "⚡ Consistent", color: "#ccff00" };
    if (days <= 60) return { name: "🔥 Pro", color: "#ffe600" };
    return { name: "🏆 Master", color: "#ffd700" };
  };

  const rankData = getRankData(totalActiveDays);

  return (
    <div style={{ display: "flex" }}>

      <div style={{ width: "250px", padding: "20px" }}>
        <div className="card" style={{ background: "#111" }}>
          <h3 style={{ color: "#00ff6a" }}>🏅 Ranking System</h3>

          <p style={{ color: rankData.name.includes("Beginner") ? "#00ff6a" : "#888" }}>🐣 Beginner (0–5 days)</p>
          <p style={{ color: rankData.name.includes("Learner") ? "#a3ff00" : "#888" }}>🔰 Learner (6–15 days)</p>
          <p style={{ color: rankData.name.includes("Consistent") ? "#ccff00" : "#888" }}>⚡ Consistent (16–30 days)</p>
          <p style={{ color: rankData.name.includes("Pro") ? "#ffe600" : "#888" }}>🔥 Pro (31–60 days)</p>
          <p style={{ color: rankData.name.includes("Master") ? "#ffd700" : "#888" }}>🏆 Master (61+ days)</p>
        </div>
      </div>

      <div className="center" style={{ flex: 1 }}>

        <div style={{ position: "absolute", top: 20, right: 20, textAlign: "right" }}>

          <div style={{
            background: `linear-gradient(45deg, ${rankData.color}, #b2ff59)`,
            color: "black",
            padding: "10px 15px",
            borderRadius: "20px",
            marginBottom: "10px",
            fontWeight: "bold",
            display: "inline-block"
          }}>
            {rankData.name}
          </div>

          <br />

          <img
            src={user.profilePic || ""}
            alt="profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid #00ff6a",
              background: "#222",
              marginBottom: "10px",
              cursor: "pointer"
            }}
            onClick={() => navigate("/profile")}
          />

          <br />

          <button onClick={() => navigate("/profile")} style={{ marginRight: "10px" }}>
            Profile
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h1 className="heading-3d">
          <FaChartLine style={{ marginRight: "10px" }} />
          Dashboard
        </h1>

        <div className="input-box">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter habit..."
          />
          <button onClick={addHabit}>Add Habit</button>
        </div>

        {habits.length === 0 ? <EmptyGraph /> : habits.map((habit) => (
          <HabitCard key={habit._id} habit={habit} refreshHabits={fetchHabits} />
        ))}

      </div>
    </div>
  );
}

export default Dashboard;