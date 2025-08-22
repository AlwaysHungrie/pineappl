export default function Square({
  size,
  isGround,
  index,
  children,
}: {
  size: number;
  isGround: boolean;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex p-px"
      style={{
        width: size,
        height: size,
      }}
    >
      {isGround ? (
        <div className="flex-1 bg-amber-700 flex items-center justify-center relative">{children}</div>
      ) : (
        <div className="flex-1 bg-[#cbe2e4b6] flex items-center justify-center">{children}</div>
      )}
    </div>
  );
}
