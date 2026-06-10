import { useEffect, useRef, KeyboardEvent } from "react";
import confetti from "canvas-confetti";
import { useGameLogic } from "./hooks/useGameLogic";
import BackgroundOrbs from "./components/BackgroundOrbs";
import NumberBox from "./components/NumberBox";
import MessageBanner from "./components/MessageBanner";
import ScoreBoard from "./components/ScoreBoard";
import GuessHistory from "./components/GuessHistory";
import GameOverlay from "./components/GameOverlay";

function fireConfetti() {
  const duration = 4000;
  const end = Date.now() + duration;

  const colors = ["#7c3aed", "#4f46e5", "#06b6d4", "#fbbf24", "#ec4899", "#10b981"];

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      startVelocity: 45,
      gravity: 0.8,
      ticks: 300,
      scalar: 1.2,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      startVelocity: 45,
      gravity: 0.8,
      ticks: 300,
      scalar: 1.2,
    });
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 120,
      origin: { x: 0.5, y: 0 },
      colors,
      startVelocity: 30,
      gravity: 0.6,
      ticks: 300,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export default function App() {
  const { state, checkGuess, setGuess, resetGame } = useGameLogic();
  const inputRef = useRef<HTMLInputElement>(null);
  const confettiFired = useRef(false);

  // Focus input on mount and reset
  useEffect(() => {
    if (state.status === "playing") {
      inputRef.current?.focus();
      confettiFired.current = false;
    }
  }, [state.status]);

  // Fire confetti on win
  useEffect(() => {
    if (state.status === "won" && !confettiFired.current) {
      confettiFired.current = true;
      setTimeout(fireConfetti, 200);
    }
  }, [state.status]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkGuess();
    }
  };

  const handleInput = (v: string) => {
    // Only allow digits and limit to 3 chars
    const cleaned = v.replace(/\D/g, "").slice(0, 3);
    setGuess(cleaned);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background */}
      <BackgroundOrbs />

      {/* Main card */}
      <div
        className="relative z-10 w-full max-w-md animate-slide-in-up"
        style={{ animationDuration: "0.6s" }}
      >
        <div
          className="relative rounded-3xl p-6 sm:p-8 glass overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow:
              "0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Top decorative bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl animate-gradient"
            style={{
              background:
                "linear-gradient(90deg, #7c3aed, #4f46e5, #06b6d4, #ec4899, #7c3aed)",
              backgroundSize: "300% 100%",
            }}
          />

          {/* Header */}
          <div className="text-center mb-6 mt-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl">🎯</span>
              <h1
                className="text-3xl sm:text-4xl font-black tracking-tight animate-glow-pulse"
                style={{
                  background:
                    "linear-gradient(135deg, #c4b5fd 0%, #818cf8 40%, #67e8f9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Guess My Number!
              </h1>
              <span className="text-2xl">🎯</span>
            </div>
            <p className="text-xs text-purple-300 opacity-60 tracking-widest uppercase font-semibold">
              Between 1 and 100 • Score starts at 20
            </p>
          </div>

          {/* Number box */}
          <div className="flex justify-center mb-6">
            <NumberBox
              secretNumber={state.secretNumber}
              revealed={state.revealed}
              status={state.status}
            />
          </div>

          {/* Message banner */}
          <div className="mb-5">
            <MessageBanner message={state.message} type={state.messageType} />
          </div>

          {/* Input + Check */}
          <div className="mb-5 relative group">
            {/* Glow behind input */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-md"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5, #06b6d4)",
              }}
            />

            <div className="relative flex gap-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="number"
                  min="1"
                  max="100"
                  value={state.guess}
                  onChange={(e) => handleInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={state.status !== "playing"}
                  placeholder="Your guess..."
                  className={`w-full rounded-2xl px-5 py-4 text-lg font-bold text-white placeholder-white/30 outline-none transition-all duration-300 glass ${
                    state.shakeInput ? "animate-shake" : ""
                  }`}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    caretColor: "#c4b5fd",
                  }}
                />
                {/* Number hint indicator */}
                {state.guess && state.status === "playing" && (
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 rounded-full animate-fade-in"
                    style={{
                      background: "rgba(124,58,237,0.3)",
                      border: "1px solid rgba(124,58,237,0.4)",
                      color: "#c4b5fd",
                    }}
                  >
                    {parseInt(state.guess) < 1 || parseInt(state.guess) > 100
                      ? "Invalid"
                      : `#${state.guess}`}
                  </div>
                )}
              </div>

              {/* Check button */}
              <button
                onClick={checkGuess}
                disabled={state.status !== "playing"}
                className="relative overflow-hidden px-6 py-4 rounded-2xl font-black text-white cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group/btn"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.5)",
                  minWidth: "90px",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
                <span className="relative flex flex-col items-center text-xs leading-tight">
                  <span className="text-xl">🔍</span>
                  <span>Check</span>
                </span>
              </button>
            </div>
          </div>

          {/* Score board */}
          <div className="mb-5">
            <ScoreBoard
              score={state.score}
              highScore={state.highScore}
              attempts={state.attempts}
            />
          </div>

          {/* Guess history */}
          {state.guessHistory.length > 0 && (
            <div className="mb-5">
              <GuessHistory history={state.guessHistory} />
            </div>
          )}

          {/* Range hint bar */}
          {state.status === "playing" && state.guessHistory.length > 0 && (
            <div className="mb-5 animate-fade-in">
              <div className="flex justify-between text-xs text-purple-300 opacity-60 mb-1">
                <span>1</span>
                <span className="font-semibold opacity-80">
                  Narrow down the range!
                </span>
                <span>100</span>
              </div>
              <div
                className="w-full h-2 rounded-full relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, #7c3aed, #4f46e5, #06b6d4)",
                    width: `${Math.min(
                      100,
                      (state.attempts / 20) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Reset button */}
          <button
            onClick={resetGame}
            className="relative overflow-hidden w-full py-3.5 rounded-2xl font-bold text-sm text-white/80 cursor-pointer transition-all duration-200 hover:text-white hover:scale-[1.02] active:scale-[0.98] group/reset"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover/reset:opacity-100 transition-opacity duration-300 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.2))",
              }}
            />
            <span className="relative flex items-center justify-center gap-2">
              <span>🔄</span>
              <span>New Game</span>
            </span>
          </button>

          {/* Decorative corner elements */}
          <div
            className="absolute top-4 right-4 text-2xl opacity-20 pointer-events-none"
            style={{ animation: "star-burst 4s ease-in-out infinite" }}
          >
            ✦
          </div>
          <div
            className="absolute bottom-4 left-4 text-xl opacity-20 pointer-events-none"
            style={{ animation: "star-burst 5s ease-in-out 1s infinite" }}
          >
            ✦
          </div>

          {/* Game overlay (Win/Lose) */}
          {state.status !== "playing" && (
            <GameOverlay
              status={state.status}
              secretNumber={state.secretNumber}
              score={state.score}
              attempts={state.attempts}
              onReset={resetGame}
            />
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/20 mt-4 font-medium tracking-widest uppercase">
          Built with ❤️ · Number Guessing Game
        </p>
      </div>
    </div>
  );
}
