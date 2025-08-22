"use client";

import Image from "next/image";
import { DIRECTIONS, useGame } from "@/contexts/gameContext";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SPRITE_SHEET_COLUMNS,
  SPRITE_SHEET_ROWS,
  useCharacter,
} from "@/contexts/characterContext";

const SPRITE_SHEET_WIDTH = 209;
const SPRITE_SHEET_HEIGHT = 326;

const MOVE_RATE = 60;
const FRAME_RATE = 16;

const SPRITE_SHEET_DIRECTIONS: Record<(typeof DIRECTIONS)[number], number> = {
  up: 4,
  down: 0,
  left: 6,
  right: 2,
};

const ORIGINAL_WIDTH = SPRITE_SHEET_WIDTH / SPRITE_SHEET_COLUMNS;
const ORIGINAL_HEIGHT = SPRITE_SHEET_HEIGHT / SPRITE_SHEET_ROWS;

const SCALE = 1.6;

const X_CORRECTION = 3;
const Y_CORRECTION = -10;

export default function Girl({ fixedWidth }: { fixedWidth?: number }) {
  const { squareSize: _squareSize } = useGame();
  const squareSize = fixedWidth || _squareSize;

  const { position, setPosition, deltaXRef, deltaYRef } = useCharacter();

  const [frameColumn, setFrameColumn] = useState(0);
  const [direction, setDirection] =
    useState<(typeof DIRECTIONS)[number]>("down");

  const width = squareSize * SCALE * 0.55;
  const height = squareSize * SCALE * 0.9;

  const spriteSheetScale = width / ORIGINAL_WIDTH;

  const animationPositionRef = useRef<number>(0);
  const lastFrameTimePositionRef = useRef<number>(0);

  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeFrameRef = useRef<number>(0);

  const animatePosition = useCallback((currentTime: number) => {
    if (currentTime - lastFrameTimePositionRef.current > 1000 / MOVE_RATE) {
      lastFrameTimePositionRef.current = currentTime;
      setPosition((prev) => {
        if (!prev) {
          return null;
        }
        return {
          x: prev.x + deltaXRef.current,
          y: prev.y + deltaYRef.current,
        };
      });
    }

    animationPositionRef.current = requestAnimationFrame(animatePosition);
  }, []);

  const animateFrame = useCallback((currentTime: number) => {
    if (currentTime - lastFrameTimeFrameRef.current > 1000 / FRAME_RATE) {
      lastFrameTimeFrameRef.current = currentTime;
      if (Math.abs(deltaXRef.current) > 0 || Math.abs(deltaYRef.current) > 0) {
        setFrameColumn((prev) => (prev % (SPRITE_SHEET_COLUMNS - 1)) + 1);
        if (deltaXRef.current > 0) {
          setDirection("right");
        } else if (deltaYRef.current > 0) {
          setDirection("down");
        } else if (deltaXRef.current < 0) {
          setDirection("left");
        } else if (deltaYRef.current < 0) {
          setDirection("up");
        }
      } else {
        setFrameColumn(0);
        setDirection("down");
      }
    }

    animationFrameRef.current = requestAnimationFrame(animateFrame);
  }, []);

  useEffect(() => {
    animationPositionRef.current = requestAnimationFrame(animatePosition);
    animationFrameRef.current = requestAnimationFrame(animateFrame);
    return () => {
      cancelAnimationFrame(animationPositionRef.current);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animatePosition, animateFrame]);

  if (!position) {
    return null;
  }

  return (
    <div
      className="absolute select-none flex items-center justify-center"
      style={{
        height: `${squareSize}px`,
        width: `${squareSize}px`,
        transform: fixedWidth ? 'none' : `translate(${position.x + X_CORRECTION}px, ${
          position.y + Y_CORRECTION
        }px)`,
      }}
    >
      <div
        className="girl overflow-hidden"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          imageRendering: "pixelated",
        }}
      >
        <Image
          src="/girl/sprite-sheet.png"
          alt="girl"
          width={SPRITE_SHEET_WIDTH * spriteSheetScale}
          height={SPRITE_SHEET_HEIGHT * spriteSheetScale}
          className="max-w-none"
          draggable={false}
          style={{
            transform: `translateX(${
              -frameColumn * ORIGINAL_WIDTH * spriteSheetScale
            }px) translateY(${
              -SPRITE_SHEET_DIRECTIONS[direction] *
              ORIGINAL_HEIGHT *
              spriteSheetScale
            }px)`,
          }}
        />
      </div>

      <div className="absolute bottom-[-8px] w-full flex justify-center">
        <div
          className={`bg-black/20 rounded-[50%] translate-0.5`}
          style={{
            width: `${squareSize * 0.7}px`,
            height: `${squareSize * 0.15}px`,
          }}
        />
      </div>
    </div>
  );
}
