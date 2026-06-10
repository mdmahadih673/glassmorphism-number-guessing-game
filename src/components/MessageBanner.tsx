import { useEffect, useState } from "react";

interface Props {
  message: string;
  type: "info" | "success" | "error" | "warning";
}

const config = {
  info: {
    bg: "rgba(99,102,241,0.2)",
    border: "rgba(99,102,241,0.4)",
    text: "#a5b4fc",
    icon: "🎯",
  },
  success: {
    bg: "rgba(16,185,129,0.2)",
    border: "rgba(16,185,129,0.4)",
    text: "#6ee7b7",
    icon: "🎉",
  },
  error: {
    bg: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.4)",
    text: "#fca5a5",
    icon: "❌",
  },
  warning: {
    bg: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.4)",
    text: "#fcd34d",
    icon: "⚠️",
  },
};

export default function MessageBanner({ message, type }: Props) {
  const [key, setKey] = useState(0);
  const [prevMsg, setPrevMsg] = useState(message);

  useEffect(() => {
    if (message !== prevMsg) {
      setKey((k) => k + 1);
      setPrevMsg(message);
    }
  }, [message, prevMsg]);

  const { bg, border, text } = config[type];

  return (
    <div
      key={key}
      className="animate-slide-in-down w-full rounded-2xl px-5 py-4 text-center font-semibold text-sm leading-snug"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        color: text,
        backdropFilter: "blur(10px)",
      }}
    >
      {message}
    </div>
  );
}
