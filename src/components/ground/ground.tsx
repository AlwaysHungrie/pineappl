"use client";

import { COLS, ROWS, useGame } from "@/contexts/gameContext";
import Girl from "@/components/girl";
import Square from "./square";
import Pineapple from "../pineapple";

export default function Ground() {
  const { squareSize, levelData, pineappleCoordinates } = useGame();
  const { ground } = levelData || {};

  return (
    <div
      className="grid gap-0 p-1 bg-amber-900 rounded-md relative"
      style={{
        gridTemplateColumns: `repeat(${COLS}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${squareSize}px)`,
      }}
    >
      {/* {Array.from({ length: ROWS * COLS }, (_, index) => (

        <Square key={index} size={squareSize} index={index} />
      ))} */}
      {Array.from({ length: ROWS }, (_, j) => {
        return Array.from({ length: COLS }, (_, i) => {
          const isGround = ground?.has(`${i},${j}`);
          const isPineapple = pineappleCoordinates?.find((pineapple) => pineapple === `${i},${j}`);
          return (
            <Square
              key={`${i},${j}`}
              size={squareSize}
              row={j}
              col={i}
              isGround={isGround || false}
            >
              {isPineapple ? <Pineapple /> : null}
            </Square>
          );
        });
      })}
      <Girl />
    </div>
  );
}
