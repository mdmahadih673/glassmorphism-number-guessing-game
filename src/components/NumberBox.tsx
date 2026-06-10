import { useEffect, useState } from "react";

interface Props {
  secretNumber: number;
  revealed: boolean;
  status: "playing" | "won" | "lost";
}

export default function NumberBox({ secretNumber, revealed, status }: Props) {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (revealed) setAnimKey((k) => k + 1);
  }, [revealed]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Glow ring */}
      <div
        className={`relative flex items-center justify-center rounded-3xl transition-all duration-700 ${
          status === "won"
            ? "animate-pulse-glow"
            : status === "lost"
            ? ""
            : "animate-float"
        }`}
        style={{
          width: "140px",
          height: "140px",
        }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-3xl opacity-60"
          style={{
            background: revealed
              ? status === "won"
                ? "linear-gradient(135deg, #fbbf24, #f59e0b, #ef4444, #ec4899)"
                : "linear-gradient(135deg, #ef4444, #dc2626)"
              : "linear-gradient(135deg, #7c3aed, #4f46e5, #06b6d4)",
            padding: "2px",
          }}
        />

        {/* Inner card */}
        <div
          className="absolute inset-[2px] rounded-3xl glass flex items-center justify-center"
          style={{
            background: revealed
              ? status === "won"
                ? "rgba(251,191,36,0.15)"
                : "rgba(239,68,68,0.15)"
              : "rgba(124,58,237,0.15)",
          }}
        >
          {revealed ? (
            <span
              key={animKey}
              className="animate-number-pop font-black text-5xl"
              style={{
                background:
                  status === "won"
                    ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                    : "linear-gradient(135deg, #ef4444, #fca5a5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 12px rgba(251,191,36,0.6))",
              }}
            >
              {secretNumber}
            </span>
          ) : (
            <span
              className="font-black text-5xl animate-glow-pulse"
              style={{
                background: "linear-gradient(135deg, #c4b5fd, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ?
            </span>
          )}
        </div>

        {/* Corner sparkles for win */}
        {status === "won" && revealed && (
          <>
            {["✨", "⭐", "🌟", "💫"].map((star, i) => (
              <div
                key={i}
                className="absolute text-xl"
                style={{
                  top: i < 2 ? "-20px" : "auto",
                  bottom: i >= 2 ? "-20px" : "auto",
                  left: i % 2 === 0 ? "-20px" : "auto",
                  right: i % 2 === 1 ? "-20px" : "auto",
                  animation: `star-burst 1.5s ease-in-out ${i * 0.3}s infinite`,
                }}
              >
                {star}
              </div>
            ))}
          </>
        )}
      </div>

      <p
        className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] opacity-60"
        style={{ color: "#c4b5fd" }}
      >
        {revealed ? "The Number Was" : "Secret Number"}
      </p>
    </div>
  );
}
