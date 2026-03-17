import React from "react";
import leaf from "../assets/daun.png";

const leaves = Array.from({ length: 15 });

const FallingLeaves: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {leaves.map((_, i) => {
        const size = Math.random() * 30 + 20;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;

        return (
          <img
            key={i}
            src={leaf}
            className="absolute animate-fall"
            style={{
              width: size,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default FallingLeaves;