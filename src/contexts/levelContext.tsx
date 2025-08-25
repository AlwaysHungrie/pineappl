"use client";

import { createContext, useContext, useEffect, useState } from "react";

const COMPLETED_LEVELS_STORAGE_KEY = "pineapple-completed-levels";

export interface LevelContextType {
  completedLevels: Set<string>;
  setLevelStatus: (levelId: string, status: "completed" | "incomplete") => void;
}

export const LevelContext = createContext<LevelContextType>({
  completedLevels: new Set(),
  setLevelStatus: () => {},
});

// Helper functions for localStorage operations
const serializeCompletedLevels = (completedLevels: Set<string>): string => {
  return JSON.stringify(Array.from(completedLevels));
};

const deserializeCompletedLevels = (storedData: string | null): Set<string> => {
  if (!storedData) return new Set();

  try {
    const parsedData = JSON.parse(storedData);
    return new Set(Array.isArray(parsedData) ? parsedData : []);
  } catch (error) {
    console.warn("Failed to parse completed levels from localStorage:", error);
    return new Set();
  }
};

export const LevelContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(
    new Set()
  );

  // Load completed levels from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem(COMPLETED_LEVELS_STORAGE_KEY);
    const deserializedLevels = deserializeCompletedLevels(storedData);
    setCompletedLevels(deserializedLevels);
  }, []);

  // reset all completed levels
  const resetCompletedLevels = () => {
    setCompletedLevels(new Set());
    localStorage.removeItem(COMPLETED_LEVELS_STORAGE_KEY);
  };

  useEffect(() => {
    // resetCompletedLevels();
  }, []);

  const setLevelStatus = (
    levelId: string,
    status: "completed" | "incomplete"
  ) => {
    const newCompletedLevels = new Set(completedLevels);

    if (status === "completed") {
      newCompletedLevels.add(levelId);
    } else {
      newCompletedLevels.delete(levelId);
    }

    setCompletedLevels(newCompletedLevels);

    // Persist to localStorage
    const serializedData = serializeCompletedLevels(newCompletedLevels);
    localStorage.setItem(COMPLETED_LEVELS_STORAGE_KEY, serializedData);
  };

  return (
    <LevelContext.Provider value={{ completedLevels, setLevelStatus }}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevel = () => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error("useLevel must be used within a LevelContextProvider");
  }
  return context;
};
