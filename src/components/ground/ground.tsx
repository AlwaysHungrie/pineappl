"use client";

import { useEffect, useState } from "react";
import { useScreen } from "usehooks-ts";
import Square from "./square";

const ROWS = 8;
const COLS = 8;
const PADDING = 16;
const MAX_SQUARE_SIZE = 64;
const SCREEN_HEIGHT_PERCENTAGE = 0.4;

export default function Ground() {
  const [isClient, setIsClient] = useState(false);
  const screen = useScreen();

  // Calculate square size based on screen constraints
  const squareSize = screen
    ? Math.min(
        (screen.width - PADDING * 2) / COLS,
        (screen.height * SCREEN_HEIGHT_PERCENTAGE) / ROWS,
        MAX_SQUARE_SIZE
      )
    : 0;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || squareSize <= 0) {
    return null;
  }

  return (
    <div
      className="grid gap-0 bg-amber-900 p-1 rounded-md"
      style={{
        gridTemplateColumns: `repeat(${COLS}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${squareSize}px)`,
      }}
    >
      {Array.from({ length: ROWS * COLS }, (_, index) => (
        <Square key={index} size={squareSize} index={index} />
      ))}
    </div>
  );
}
