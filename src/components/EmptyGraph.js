import React, { useEffect, useState } from "react";

function EmptyGraph() {
  const [points, setPoints] = useState([
    220, 200, 230, 180, 160, 190, 140, 100, 130, 80, 50
  ]);

  // 🔥 LIVE MOVEMENT
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        let newPoints = [...prev.slice(1)];

        let last = newPoints[newPoints.length - 1];
        let change = Math.floor(Math.random() * 30) - 10;

        let next = Math.max(40, last - change); // keep upward bias

        newPoints.push(next);
        return newPoints;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Convert to SVG path
  const path = points
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * 70},${y}`)
    .join(" ");

  return (
    <div style={{ marginTop: "40px", width: "100%", height: "300px" }}>
      <svg viewBox="0 0 800 300" width="100%" height="100%">

        {/* Grid */}
        <g stroke="#1f3d2b" strokeWidth="1">
          {[...Array(6)].map((_, i) => (
            <line key={i} x1="0" y1={i * 50} x2="800" y2={i * 50} />
          ))}
        </g>

        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke="#22c55e"
          strokeWidth="4"
          style={{
            filter: "drop-shadow(0 0 8px #22c55e)",
            transition: "all 0.5s ease"
          }}
        />

        {/* Dots */}
        {points.map((y, i) => (
          <circle
            key={i}
            cx={i * 70}
            cy={y}
            r="4"
            fill="#84cc16"
          />
        ))}
      </svg>

      {/* Arrow */}
      <div style={{
        textAlign: "right",
        fontSize: "28px",
        color: "#22c55e"
      }}>
        ↗
      </div>
    </div>
  );
}

export default EmptyGraph;