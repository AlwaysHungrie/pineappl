"use client";

import { COLS, ROWS, useGame } from "@/contexts/gameContext";
import Girl from "@/components/girl";
import Square from "./square";
import Pineapple from "../pineapple";
import { useState } from "react";

export default function Ground() {
  const { squareSize, levelData, pineappleCoordinates } = useGame();
  const { ground } = levelData || {};

  const [devMove] = useState(false);
  const [selectedSquares, setSelectedSquares] = useState<Set<string>>(
    new Set()
  );

  const toggleSquareSelection = (i: number, j: number) => {
    setSelectedSquares((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(`${i},${j}`)) {
        newSet.delete(`${i},${j}`);
      } else {
        newSet.add(`${i},${j}`);
      }
      return newSet;
    });
  };

  return (
    <div
      className="grid gap-0 p-1 bg-amber-900 rounded-md relative"
      style={{
        gridTemplateColumns: `repeat(${COLS}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${squareSize}px)`,
      }}
    >
      {devMove ? (
        <button
          className="absolute bottom-0 right-[-50px]"
          onClick={() => {
            const selectedSquaresArray = Array.from(selectedSquares);
            const selectedSquaresString = selectedSquaresArray
              .map((square) => square.split(","))
              .map(([i, j]) => `"${i},${j}"`)
              .join(",");
            navigator.clipboard.writeText(`[${selectedSquaresString}]`);
          }}
        >
          Copy
        </button>
      ) : null}
      {Array.from({ length: ROWS }, (_, j) => {
        return Array.from({ length: COLS }, (_, i) => {
          const isGround = ground?.has(`${i},${j}`);
          const isPineapple = pineappleCoordinates?.find(
            (pineapple) => pineapple === `${i},${j}`
          );
          const isSelected = selectedSquares.has(`${i},${j}`);
          return (
            <Square
              key={`${i},${j}`}
              size={squareSize}
              row={j}
              col={i}
              isGround={isGround || false}
              onClick={() => {
                if (!devMove) return;
                toggleSquareSelection(i, j);
              }}
            >
              {isSelected ? `${i},${j}` : null}
              {isPineapple ? <Pineapple /> : null}
            </Square>
          );
        });
      })}
      <Girl />
    </div>
  );
}
