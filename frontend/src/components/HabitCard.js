import React from "react";
import StreakGrid from "./StreakGrid";
import axios from "axios";

function HabitCard({ habit, refreshHabits }) {

  const token = localStorage.getItem("token");

  // 🔥 AUTOMATIC URL CONFIG (Local vs Live checking)
  const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://my-habit-backend.onrender.com";

  // 🔥 TOTAL ACTIVE DAYS
  const totalActiveDays = Object.keys(habit.dates || {}).length;

  // 🏆 LONGEST STREAK CALCULATION
  const calculateLongestStreak = (datesObj) => {
    if (!datesObj) return 0;

    const dates = Object.keys(datesObj).sort(); // sorted dates
    let longest = 0;
    let current = 0;

    for (let i = 0; i < dates.length; i++) {
      if (i === 0) {
        current = 1;
      } else {
        const prev = new Date(dates[i - 1]);
        const curr = new Date(dates[i]);

        const diff = (curr - prev) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
          current += 1;
        } else {
          current = 1;
        }
      }

      if (current > longest) {
        longest = current;
      }
    }

    return longest;
  };

  const longestStreak = calculateLongestStreak(habit.dates);

  const handleAddProgress = async () => {
    try {
      await axios.post(
        `${API_URL}/complete/${habit._id}`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      refreshHabits();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_URL}/delete/${habit._id}`,
        {
          headers: { Authorization: token },
        }
      );
      refreshHabits();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">

      <h3>{habit.name}</h3>

      <div style={{ margin: "10px 0" }}>
        <button onClick={handleAddProgress}>Add Progress</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      {/* 🔥 CURRENT STREAK */}
      <p className="streak">🔥 Current Streak: {habit.streak || 0} days</p>

      {/* 🏆 LONGEST STREAK */}
      <p>🏆 Longest Streak: {longestStreak} days</p>

      {/* 🔥 TOTAL ACTIVE DAYS */}
      <p>🔥 Total Active Days: {totalActiveDays}</p>

      <StreakGrid dates={habit.dates || {}} />

    </div>
  );
}

export default HabitCard;