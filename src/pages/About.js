import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

function About() {
  return (
    <div className="center" style={{ padding: "40px" }}>

      <h1 className="heading-3d">About Me</h1>

      {/* MAIN CONTAINER */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        flexWrap: "wrap",
        maxWidth: "900px"
      }}>

        {/* LEFT SIDE - TEXT */}
        <div style={{ maxWidth: "450px" }}>

          <h2 style={{ color: "#00ff6a", marginBottom: "10px" }}>
            Ashmita Chatterjee
          </h2>

          <p style={{
            color: "#9be89b",
            fontWeight: "bold",
            marginBottom: "15px"
          }}>
            IT Student • MERN Stack Developer • Problem Solver
          </p>

          <p style={{ lineHeight: "1.7", marginBottom: "15px" }}>
            I am currently pursuing my B.Tech in Information Technology (2027 passout)
            from Asansol Engineering College. I enjoy building real-world applications
            and continuously improving my development skills.
          </p>

          <p style={{ lineHeight: "1.7", marginBottom: "15px" }}>
            This Habit Tracker project is one of my full-stack applications where I have
            implemented authentication, streak tracking, and a user-friendly interface.
            It reflects my interest in creating practical and meaningful web solutions.
          </p>

          <p style={{ lineHeight: "1.7", marginBottom: "15px" }}>
            I am passionate about learning new technologies, solving problems, and
            building projects that can make a real impact.
          </p>

          {/* CONTACT */}
          <div style={{ marginTop: "20px" }}>
            <p><b>Email:</b> chatterjeeashmita25@gmail.com</p>

            <div style={{
              display: "flex",
              gap: "20px",
              marginTop: "10px",
              fontSize: "20px"
            }}>
              <a href="https://www.linkedin.com/in/ashmita-chatterjee-62272628b/" target="_blank" rel="noreferrer">
                <FaLinkedin color="#00ff6a" />
              </a>

              <a href="https://github.com/iashmita97" target="_blank" rel="noreferrer">
                <FaGithub color="#00ff6a" />
              </a>

              <a href="https://x.com/iashmita_12" target="_blank" rel="noreferrer">
                <FaTwitter color="#00ff6a" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div style={{
          animation: "slideIn 1s ease"
        }}>
          <img
            src="/profile.jpeg"
            alt="Ashmita"
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "20px",
              objectFit: "cover",
              objectPosition: "top", // ✅ better face visibility
              border: "3px solid #00ff6a",
              boxShadow: "0 0 25px rgba(0,255,106,0.4)"
            }}
          />
        </div>

      </div>

      {/* ANIMATION STYLE */}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>

    </div>
  );
}

export default About;