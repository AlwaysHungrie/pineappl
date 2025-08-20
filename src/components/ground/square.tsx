export default function Square({
  size,
  index,
}: {
  size: number;
  index: number;
}) {
  return (
    <div
      className="flex p-px"
      style={{
        width: size,
        height: size,
      }}
    >
      <div className="flex-1 bg-amber-700 flex items-center justify-center">
        {index}
      </div>
    </div>
  );
}
