import React from "react";
import { Link } from "react-router-dom";
import EmptyGraph from "../components/EmptyGraph";
import { FaChartLine } from "react-icons/fa";

function Home() {
  return (
    <div className="center">

      {/* 🔥 TITLE */}
      <h1 className="hero-heading">
        <span className="icon-3d">
          <FaChartLine />
        </span>
        Habit Tracker
      </h1>

      {/* Subtitle */}
      <p className="hero-subtext">
        Build consistency. Track progress. Grow daily.
      </p>

      {/* 🔘 BUTTONS */}
      <div className="nav-buttons">

        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/signup">
          <button>Sign Up</button>
        </Link>

        {/* ✅ THIS IS YOUR ABOUT BUTTON */}
        <Link to="/about">
          <button>About Me</button>
        </Link>

      </div>

      {/* 📈 GRAPH */}
      <div className="hero-section">
        <EmptyGraph />
      </div>

    </div>
  );
}

export default Home;