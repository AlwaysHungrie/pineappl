"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useScreen } from "usehooks-ts";

export const DIRECTIONS = ["up", "down", "left", "right"] as const;

interface GameContextType {
  squareSize: number;
  isClient: boolean;
  girlCoordinates: {
    x: number;
    y: number;
  } | null;
  setGirlCoordinates: React.Dispatch<React.SetStateAction<{
    x: number;
    y: number;
  } | null>>;
  bounds: Set<string>;
  setBounds: (bounds: Set<string>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const ROWS = 8;
export const COLS = 8;

export const PADDING = 16;
const MAX_SQUARE_SIZE = 64;
const SCREEN_HEIGHT_PERCENTAGE = 0.4;

export function GameProvider({ children }: GameProviderProps) {
  const [isClient, setIsClient] = useState(false);
  const screen = useScreen();
  const [girlCoordinates, setGirlCoordinates] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [bounds, setBounds] = useState<Set<string>>(
    new Set()
  );

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

  const value: GameContextType = {
    squareSize,
    isClient,
    girlCoordinates,
    setGirlCoordinates,

    bounds,
    setBounds,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
