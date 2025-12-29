export function BackgroundGlow() {
  return (
    <>
      <style>
        {`
          @keyframes move-glow-1 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(10vw, -10vh) scale(1.2); }
            100% { transform: translate(0, 0) scale(1); }
          }
          @keyframes move-glow-2 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-15vw, 15vh) scale(0.8); }
            100% { transform: translate(0, 0) scale(1); }
          }
          .glow-1 { animation: move-glow-1 25s ease-in-out infinite; }
          .glow-2 { animation: move-glow-2 30s ease-in-out infinite; }
        `}
      </style>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="glow-1 absolute bottom-0 left-[-20%] top-[-10%] h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--primary)/0.1),transparent)] transition-all duration-1000"></div>
        <div className="glow-2 absolute bottom-[-10rem] right-[-20rem] h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--accent)/0.1),transparent)] transition-all duration-1000"></div>
      </div>
    </>
  );
}
