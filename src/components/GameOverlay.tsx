interface Props {
  status: "won" | "lost";
  secretNumber: number;
  score: number;
  attempts: number;
  onReset: () => void;
}

export default function GameOverlay({ status, secretNumber, score, attempts, onReset }: Props) {
  const isWon = status === "won";

  return (
    <div
      className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center z-20 animate-fade-in"
      style={{
        background: isWon
          ? "rgba(0,0,0,0.75)"
          : "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        borderRadius: "inherit",
      }}
    >
      {/* Emoji */}
      <div
        className="text-8xl mb-4"
        style={{
          animation: isWon
            ? "win-bounce 1s ease-in-out infinite"
            : "shake 0.5s cubic-bezier(0.36,0.07,0.19,0.97) both",
          filter: `drop-shadow(0 0 20px ${isWon ? "rgba(251,191,36,0.8)" : "rgba(239,68,68,0.8)"})`,
        }}
      >
        {isWon ? "🏆" : "💀"}
      </div>

      {/* Title */}
      <h2
        className="text-4xl font-black mb-1 animate-slide-in-down"
        style={{
          background: isWon
            ? "linear-gradient(135deg, #fbbf24, #f59e0b, #fde68a)"
            : "linear-gradient(135deg, #ef4444, #fca5a5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
        }}
      >
        {isWon ? "You Win!" : "Game Over!"}
      </h2>

      {/* Subtitle */}
      <p className="text-purple-300 text-sm mb-6 opacity-80 animate-slide-in-up">
        {isWon
          ? `Cracked it in ${attempts} attempt${attempts === 1 ? "" : "s"}!`
          : `The number was ${secretNumber}`}
      </p>

      {/* Stats row */}
      {isWon && (
        <div className="flex gap-6 mb-6 animate-fade-in">
          <div className="text-center">
            <div
              className="text-3xl font-black"
              style={{
                background: "linear-gradient(135deg, #6ee7b7, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {score}
            </div>
            <div className="text-xs text-purple-300 opacity-60 mt-1">Score</div>
          </div>
          <div className="w-px bg-white opacity-10" />
          <div className="text-center">
            <div
              className="text-3xl font-black"
              style={{
                background: "linear-gradient(135deg, #67e8f9, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {attempts}
            </div>
            <div className="text-xs text-purple-300 opacity-60 mt-1">Tries</div>
          </div>
        </div>
      )}

      {/* Play Again button */}
      <button
        onClick={onReset}
        className="relative overflow-hidden px-10 py-4 rounded-2xl font-black text-lg text-white cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 animate-bounce-in group"
        style={{
          background: isWon
            ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
            : "linear-gradient(135deg, #7c3aed, #4f46e5)",
          boxShadow: isWon
            ? "0 8px 32px rgba(251,191,36,0.4)"
            : "0 8px 32px rgba(124,58,237,0.4)",
        }}
      >
        {/* Ripple background */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.15)",
          }}
        />
        <span className="relative flex items-center gap-2">
          {isWon ? "🎮" : "🔄"} Play Again
        </span>
      </button>
    </div>
  );
}
