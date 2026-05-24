import React from "react";

const StreakGrid = ({ dates = {} }) => {
  const generateDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 89; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);

      const key = d.toISOString().slice(0, 10);
      const count = dates[key] || 0;

      // 🔥 Gradient + Glow colors
      let style = {
        width: "14px",
        height: "14px",
        borderRadius: "3px",
        border: "1px solid #1f2937",
        background: "#0d1117", // default dark
      };

      if (count === 1) {
        style.background = "linear-gradient(145deg, #22c55e, #4ade80)";
        style.boxShadow = "0 0 4px rgba(34,197,94,0.5)";
      } else if (count === 2) {
        style.background = "linear-gradient(145deg, #16a34a, #22c55e)";
        style.boxShadow = "0 0 6px rgba(34,197,94,0.6)";
      } else if (count === 3) {
        style.background = "linear-gradient(145deg, #15803d, #16a34a)";
        style.boxShadow = "0 0 8px rgba(34,197,94,0.7)";
      } else if (count >= 4) {
        style.background = "linear-gradient(145deg, #14532d, #22c55e)";
        style.boxShadow = "0 0 10px rgba(34,197,94,0.9)";
      }

      days.push(
        <div
          key={i}
          title={`${key} (${count})`}
          style={style}
        />
      );
    }

    return days;
  };

  return (
    <div style={{ marginTop: "12px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(30, 14px)",
          gap: "4px",
        }}
      >
        {generateDays()}
      </div>
    </div>
  );
};

export default StreakGrid;