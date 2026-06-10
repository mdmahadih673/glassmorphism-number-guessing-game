interface HistoryItem {
  value: number;
  result: "high" | "low" | "correct";
}

interface Props {
  history: HistoryItem[];
}

export default function GuessHistory({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="w-full animate-fade-in">
      <p className="text-xs uppercase tracking-widest font-bold opacity-50 text-purple-300 mb-2 text-center">
        Your Guesses
      </p>
      <div className="flex flex-wrap gap-2 justify-center max-h-24 overflow-y-auto">
        {history.map((item, i) => (
          <div
            key={i}
            className="animate-bounce-in flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              animationDelay: `${i * 0.05}s`,
              background:
                item.result === "correct"
                  ? "rgba(16,185,129,0.3)"
                  : item.result === "high"
                  ? "rgba(239,68,68,0.2)"
                  : "rgba(59,130,246,0.2)",
              border: `1px solid ${
                item.result === "correct"
                  ? "rgba(16,185,129,0.5)"
                  : item.result === "high"
                  ? "rgba(239,68,68,0.4)"
                  : "rgba(59,130,246,0.4)"
              }`,
              color:
                item.result === "correct"
                  ? "#6ee7b7"
                  : item.result === "high"
                  ? "#fca5a5"
                  : "#93c5fd",
            }}
          >
            <span>
              {item.result === "correct"
                ? "✅"
                : item.result === "high"
                ? "📈"
                : "📉"}
            </span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
