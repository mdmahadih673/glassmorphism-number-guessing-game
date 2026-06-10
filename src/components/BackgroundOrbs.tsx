

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 30%, #1a1a4e 60%, #0a0a2e 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Glowing orbs */}
      <div
        className="absolute rounded-full blur-[120px] opacity-30 animate-float"
        style={{
          width: "600px",
          height: "600px",
          top: "-100px",
          left: "-150px",
          background: "radial-gradient(circle, #7c3aed, #4f46e5)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute rounded-full blur-[100px] opacity-25 animate-float"
        style={{
          width: "500px",
          height: "500px",
          top: "40%",
          right: "-150px",
          background: "radial-gradient(circle, #06b6d4, #3b82f6)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute rounded-full blur-[80px] opacity-20 animate-float"
        style={{
          width: "400px",
          height: "400px",
          bottom: "-50px",
          left: "30%",
          background: "radial-gradient(circle, #ec4899, #8b5cf6)",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute rounded-full blur-[60px] opacity-15 animate-float"
        style={{
          width: "300px",
          height: "300px",
          top: "20%",
          left: "50%",
          background: "radial-gradient(circle, #10b981, #06b6d4)",
          animationDelay: "2s",
        }}
      />

      {/* Floating stars / dots */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            animation: `float ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
