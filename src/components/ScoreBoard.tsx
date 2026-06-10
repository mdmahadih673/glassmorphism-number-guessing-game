import { useEffect, useRef } from "react";

interface Props {
  score: number;
  highScore: number;
  attempts: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    if (ref.current && value !== prev.current) {
      ref.current.classList.remove("animate-bounce-in");
      void ref.current.offsetWidth;
      ref.current.classList.add("animate-bounce-in");
      prev.current = value;
    }
  }, [value]);

  return (
    <span ref={ref} className="inline-block">
      {value}
    </span>
  );
}

export default function ScoreBoard({ score, highScore, attempts }: Props) {
  const scorePercent = (score / 20) * 100;

  return (
    <div className="w-full grid grid-cols-3 gap-3">
      {/* Score */}
      <div
        className="rounded-2xl p-4 flex flex-col items-center gap-1 glass"
        style={{ border: "1px solid rgba(139,92,246,0.3)" }}
      >
        <span className="text-xs uppercase tracking-widest font-bold opacity-60 text-purple-300">
          Score
        </span>
        <span
          className="text-3xl font-black"
          style={{
            background: `linear-gradient(135deg, ${
              score > 13
                ? "#6ee7b7, #3b82f6"
                : score > 7
                ? "#fbbf24, #f59e0b"
                : "#ef4444, #fca5a5"
            })`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <AnimatedNumber value={score} />
        </span>
        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full mt-1" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${scorePercent}%`,
              background:
                score > 13
                  ? "linear-gradient(90deg, #6ee7b7, #3b82f6)"
                  : score > 7
                  ? "linear-gradient(90deg, #fbbf24, #f59e0b)"
                  : "linear-gradient(90deg, #ef4444, #fca5a5)",
            }}
          />
        </div>
      </div>

      {/* High Score */}
      <div
        className="rounded-2xl p-4 flex flex-col items-center gap-1 glass"
        style={{ border: "1px solid rgba(251,191,36,0.3)" }}
      >
        <span className="text-xs uppercase tracking-widest font-bold opacity-60 text-yellow-300">
          Best
        </span>
        <span
          className="text-3xl font-black"
          style={{
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <AnimatedNumber value={highScore} />
        </span>
        <div className="text-xs mt-1 opacity-40 text-yellow-200">🏆 record</div>
      </div>

      {/* Attempts */}
      <div
        className="rounded-2xl p-4 flex flex-col items-center gap-1 glass"
        style={{ border: "1px solid rgba(6,182,212,0.3)" }}
      >
        <span className="text-xs uppercase tracking-widest font-bold opacity-60 text-cyan-300">
          Tries
        </span>
        <span
          className="text-3xl font-black"
          style={{
            background: "linear-gradient(135deg, #67e8f9, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <AnimatedNumber value={attempts} />
        </span>
        <div className="text-xs mt-1 opacity-40 text-cyan-200">attempts</div>
      </div>
    </div>
  );
}
