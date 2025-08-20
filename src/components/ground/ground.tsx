"use client";

import { COLS, ROWS, useGame } from "@/contexts/gameContext";
import Girl from "@/components/girl";
import Square from "./square";

export default function Ground() {
  const { squareSize } = useGame();

  return (
    <div
      className="grid gap-0 bg-amber-900 p-1 rounded-md relative"
      style={{
        gridTemplateColumns: `repeat(${COLS}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${squareSize}px)`,
      }}
    >
      {Array.from({ length: ROWS * COLS }, (_, index) => (
        <Square key={index} size={squareSize} index={index} />
      ))}
      <Girl />
    </div>
  );
}
