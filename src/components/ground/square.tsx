export default function Square({
  size,
  isGround,
  row,
  col,
  children,
  onClick,
}: {
  size: number;
  isGround: boolean;
  row: number;
  col: number;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex p-px"
      style={{
        width: size,
        height: size,
      }}
      onClick={onClick}
    >
      {isGround ? (
        <div className="flex-1 bg-amber-700 flex items-center justify-center relative">
          {children}
        </div>
      ) : (
        <div className="flex-1 bg-[#76d6dee6] flex items-center justify-center relative overflow-hidden">
          {/* Subtle water texture with wave animation */}
          {((row % 2 === 0 && col % 2 === 0) ||
            (row % 2 === 1 && col % 2 === 1)) && (
            <div
              className="absolute inset-0 opacity-80 animate-wave"
              style={{
                background: `
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.6) 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.5) 2px, transparent 1px)
              `,
                backgroundSize: `${size}px ${size}px`,
                animation: "wave 4s ease-in-out infinite",
              }}
            />
          )}
          {/* Content */}
          {children}
        </div>
      )}

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: translateX(0px) translateY(0px);
            background-position: 0px 0px;
          }
          25% {
            transform: translateX(-2px) translateY(1px);
            background-position: -5px -2px;
          }
          50% {
            transform: translateX(1px) translateY(-1px);
            background-position: 2px 3px;
          }
          75% {
            transform: translateX(-1px) translateY(2px);
            background-position: -3px 1px;
          }
        }
      `}</style>
    </div>
  );
}
