"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DIRECTIONS, useGame } from "./gameContext";

export const SPRITE_SHEET_ROWS = 9;
export const SPRITE_SHEET_COLUMNS = 9;

const STEP_SIZE = 2;

interface CharacterContextType {
  position: {
    x: number;
    y: number;
  } | null;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    } | null>
  >;
  stopPosition: {
    x: number;
    y: number;
  } | null;
  deltaXRef: React.RefObject<number>;
  deltaYRef: React.RefObject<number>;
  move: (direction: (typeof DIRECTIONS)[number]) => Promise<void>;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const {
    squareSize,
    girlCoordinates,
    setGirlCoordinates,
    levelData,
    pineappleCoordinates,
    setPineappleCoordinates,
  } = useGame();
  const { bounds } = levelData || {};

  const [position, setPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [stopPosition, setStopPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const deltaXRef = useRef<number>(0);
  const deltaYRef = useRef<number>(0);

  const onAnimationResolve = useRef<(value: unknown) => void>(() => {});

  const move = useCallback(
    async (direction: (typeof DIRECTIONS)[number]) => {
      const deltaX = direction === "left" ? -1 : direction === "right" ? 1 : 0;
      const deltaY = direction === "up" ? -1 : direction === "down" ? 1 : 0;

      const currentCoordinates = girlCoordinates;

      if (!currentCoordinates) {
        return;
      }

      const finalXCoordinate = currentCoordinates.x + deltaX;
      const finalYCoordinate = currentCoordinates.y + deltaY;

      let collision = null;
      let finalX = finalXCoordinate * squareSize;
      let finalY = finalYCoordinate * squareSize;

      // colision check
      if (bounds && bounds.has(`${finalXCoordinate},${finalYCoordinate}`)) {
        collision = "bound";
        finalX =
          currentCoordinates.x * squareSize + (squareSize / 1.75) * deltaX;
        finalY =
          currentCoordinates.y * squareSize + (squareSize / 1.75) * deltaY;
      } else if (
        pineappleCoordinates &&
        pineappleCoordinates.find(
          (pineapple) => pineapple === `${finalXCoordinate},${finalYCoordinate}`
        )
      ) {
        collision = "pineapple";
      }

      deltaXRef.current = STEP_SIZE * deltaX;
      deltaYRef.current = STEP_SIZE * deltaY;

      setStopPosition({ x: finalX, y: finalY });

      await new Promise((resolve) => {
        onAnimationResolve.current = resolve;
      });

      deltaXRef.current = 0;
      deltaYRef.current = 0;

      setStopPosition(null);

      if (!collision) {
        setGirlCoordinates({
          x: currentCoordinates.x + deltaX,
          y: currentCoordinates.y + deltaY,
        });
      } else if (collision === "pineapple") {
        console.log("pineapple");
        setPineappleCoordinates((prev) => {
          if (prev) {
            return prev.filter(
              (pineapple) =>
                pineapple !== `${finalXCoordinate},${finalYCoordinate}`
            );
          }
          return prev;
        });
        setGirlCoordinates({
          x: currentCoordinates.x + deltaX,
          y: currentCoordinates.y + deltaY,
        });
      } else if (collision === "bound") {
        setGirlCoordinates({
          x: currentCoordinates.x,
          y: currentCoordinates.y,
        });
        setPosition({
          x: currentCoordinates.x * squareSize,
          y: currentCoordinates.y * squareSize,
        });
      }
    },
    [pineappleCoordinates, girlCoordinates, bounds, squareSize]
  );

  useEffect(() => {
    if (!stopPosition || !position) {
      return;
    }

    if (
      Math.abs(stopPosition.x - position.x) < STEP_SIZE &&
      Math.abs(stopPosition.y - position.y) < STEP_SIZE
    ) {
      onAnimationResolve.current(true);
    }
  }, [stopPosition, position]);

  return (
    <CharacterContext.Provider
      value={{
        position,
        setPosition,
        stopPosition,
        deltaXRef,
        deltaYRef,
        move,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
}
