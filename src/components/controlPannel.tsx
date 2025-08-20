import { DIRECTIONS } from "@/contexts/gameContext";
import { useCharacter } from "@/contexts/characterContext";

export default function ControlPanel() {
  const { move } = useCharacter();

  const handleMove = (direction: (typeof DIRECTIONS)[number]) => {
    move(direction);
  };

  return (
    <div className="h-[30%] bg-red-500 w-full mt-8">
      <button onClick={() => handleMove("left")}>Left</button>
      <button onClick={() => handleMove("right")}>Right</button>
      <button onClick={() => handleMove("up")}>Up</button>
      <button onClick={() => handleMove("down")}>Down</button>
    </div>
  );
}
