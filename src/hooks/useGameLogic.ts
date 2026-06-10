import { useState, useCallback, useEffect } from "react";

export type GameStatus = "playing" | "won" | "lost";

export interface GameState {
  secretNumber: number;
  guess: string;
  score: number;
  highScore: number;
  message: string;
  messageType: "info" | "success" | "error" | "warning";
  status: GameStatus;
  attempts: number;
  shakeInput: boolean;
  revealed: boolean;
  guessHistory: { value: number; result: "high" | "low" | "correct" }[];
}

const INITIAL_SCORE = 20;

function generateSecret() {
  return Math.floor(Math.random() * 100) + 1;
}

function getHighScore(): number {
  try {
    return parseInt(localStorage.getItem("guessNumberHighScore") || "0", 10);
  } catch {
    return 0;
  }
}

function saveHighScore(score: number) {
  try {
    localStorage.setItem("guessNumberHighScore", score.toString());
  } catch {
    // ignore
  }
}

function initialState(): GameState {
  return {
    secretNumber: generateSecret(),
    guess: "",
    score: INITIAL_SCORE,
    highScore: getHighScore(),
    message: "🎯 Enter a number between 1 and 100!",
    messageType: "info",
    status: "playing",
    attempts: 0,
    shakeInput: false,
    revealed: false,
    guessHistory: [],
  };
}

export function useGameLogic() {
  const [state, setState] = useState<GameState>(initialState);

  // Clear shake after animation
  useEffect(() => {
    if (state.shakeInput) {
      const t = setTimeout(() => {
        setState((s) => ({ ...s, shakeInput: false }));
      }, 600);
      return () => clearTimeout(t);
    }
  }, [state.shakeInput]);

  const checkGuess = useCallback(() => {
    setState((prev) => {
      if (prev.status !== "playing") return prev;

      const numGuess = parseInt(prev.guess, 10);

      if (!prev.guess || isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
        return {
          ...prev,
          message: "⚠️ Please enter a valid number between 1 and 100!",
          messageType: "warning",
          shakeInput: true,
        };
      }

      const newAttempts = prev.attempts + 1;

      if (numGuess === prev.secretNumber) {
        const newHighScore =
          prev.score > prev.highScore ? prev.score : prev.highScore;
        if (prev.score > prev.highScore) {
          saveHighScore(prev.score);
        }
        return {
          ...prev,
          message: `🎉 Brilliant! You cracked it in ${newAttempts} attempt${newAttempts === 1 ? "" : "s"}!`,
          messageType: "success",
          status: "won",
          attempts: newAttempts,
          highScore: newHighScore,
          revealed: true,
          guess: "",
          guessHistory: [
            ...prev.guessHistory,
            { value: numGuess, result: "correct" },
          ],
        };
      }

      const newScore = prev.score - 1;

      if (newScore <= 0) {
        return {
          ...prev,
          score: 0,
          message: `💀 Game Over! The number was ${prev.secretNumber}`,
          messageType: "error",
          status: "lost",
          attempts: newAttempts,
          revealed: true,
          guess: "",
          shakeInput: true,
          guessHistory: [
            ...prev.guessHistory,
            { value: numGuess, result: numGuess > prev.secretNumber ? "high" : "low" },
          ],
        };
      }

      const isHigh = numGuess > prev.secretNumber;
      return {
        ...prev,
        score: newScore,
        message: isHigh
          ? "📈 Too High! Aim lower..."
          : "📉 Too Low! Aim higher...",
        messageType: "error",
        attempts: newAttempts,
        shakeInput: true,
        guess: "",
        guessHistory: [
          ...prev.guessHistory,
          { value: numGuess, result: isHigh ? "high" : "low" },
        ],
      };
    });
  }, []);

  const setGuess = useCallback((val: string) => {
    setState((prev) => ({ ...prev, guess: val }));
  }, []);

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...initialState(),
      highScore: prev.highScore,
    }));
  }, []);

  return { state, checkGuess, setGuess, resetGame };
}
