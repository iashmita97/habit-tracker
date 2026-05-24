import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Profile() {
  const [habits, setHabits] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔥 AUTOMATIC URL CONFIG (Local vs Live checking)
  const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://my-habit-backend.onrender.com";

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchHabits();

    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) setProfilePic(savedPic);
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get(`${API_URL}/`, {
        headers: { Authorization: token },
      });
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profilePic", reader.result);
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 🔥 TOTAL ACTIVE DAYS
  const totalActiveDays = habits.reduce(
    (total, habit) => total + Object.keys(habit.dates || {}).length,
    0
  );

  // 🏆 LONGEST STREAK
  const calculateLongestStreak = (datesObj) => {
    if (!datesObj) return 0;

    const dates = Object.keys(datesObj).sort();
    let longest = 0;
    let current = 0;

    for (let i = 0; i < dates.length; i++) {
      if (i === 0) current = 1;
      else {
        const prev = new Date(dates[i - 1]);
        const curr = new Date(dates[i]);
        const diff = (curr - prev) / (1000 * 60 * 60 * 24);
        current = diff === 1 ? current + 1 : 1;
      }
      if (current > longest) longest = current;
    }
    return longest;
  };

  const longestStreak = Math.max(
    ...habits.map((h) => calculateLongestStreak(h.dates)),
    0
  );

  const currentStreak = habits.reduce(
    (total, habit) => total + (habit.streak || 0),
    0
  );

  const consistency =
    totalActiveDays === 0
      ? 0
      : Math.min((currentStreak / totalActiveDays) * 100, 100);

  return (
    <div style={{ padding: "20px" }}>

      {/* PROFILE HEADER */}
      <div style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        marginBottom: "20px"
      }}>

        {/* PROFILE IMAGE */}
        <label style={{ cursor: "pointer" }}>
          <img
            src={profilePic || "https://via.placeholder.com/120"}
            alt="profile"
            style={{
              borderRadius: "50%",
              width: "120px",
              height: "120px",
              objectFit: "cover",
              border: "4px solid #00ff6a",
              boxShadow: "0 0 20px #00ff6a"
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>

        <h2 style={{ marginTop: "10px" }}>Your Profile</h2>
        <p style={{ color: "#aaa" }}>Click image to change</p>
      </div>

      {/* CONSISTENCY CARD */}
      <div style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "20px",
        textAlign: "center",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
      }}>
        <div style={{ width: "180px", margin: "auto" }}>
          <CircularProgressbar
            value={consistency}
            text={`${Math.round(consistency)}%`}
            styles={buildStyles({
              pathColor: "#00ff6a",
              textColor: "#00ff6a",
              trailColor: "#eee"
            })}
          />
        </div>
        <p style={{ marginTop: "10px" }}>Consistency</p>
      </div>

      {/* STATS GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px",
        marginBottom: "20px"
      }}>
        {[ 
          { label: "Active Days", value: totalActiveDays, icon: "🔥" },
          { label: "Longest Streak", value: longestStreak, icon: "🏆" },
          { label: "Current Streak", value: currentStreak, icon: "⚡" },
          { label: "Total Habits", value: habits.length, icon: "📌" }
        ].map((item, i) => (
          <div key={i} style={{
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "15px",
            padding: "15px",
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
          }}>
            <h3>{item.icon}</h3>
            <h2>{item.value}</h2>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {/* HABIT CARDS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px"
      }}>
        {habits.map((habit) => {
          const totalDays = Object.keys(habit.dates || {}).length;
          const longest = calculateLongestStreak(habit.dates);

          return (
            <div key={habit._id} style={{
              background: "linear-gradient(45deg, #00ff6a, #87fd00)",
              borderRadius: "15px",
              padding: "15px",
              color: "#000",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
            }}>
              <h3>{habit.name}</h3>
              <p>🔥 {totalDays} days</p>
              <p>🏆 {longest} best</p>
              <p>⚡ {habit.streak || 0} current</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Profile;