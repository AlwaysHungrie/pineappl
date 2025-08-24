"use client";

import Navbar from "@/components/common/navbar";
import ControlPanel from "@/components/controlPanel/controlPanel";
import LevelCompleteOverlay from "@/components/gameOverlays/levelComplete";
import Ground from "@/components/ground/ground";
import { SECTIONS } from "@/content/chapters";
import { LEVEL_DATA } from "@/content/levelData";
import { useCharacter } from "@/contexts/characterContext";
import { useGame } from "@/contexts/gameContext";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const {
    isClient,
    setLevelData,
    setGirlCoordinates,
    squareSize,
    pineappleCoordinates,
    setPineappleCoordinates,
  } = useGame();
  const { setPosition, deltaXRef, deltaYRef, isRunningRef } = useCharacter();
  const { sectionId, chapterId, gameId } = useParams<{
    sectionId: string;
    chapterId: string;
    gameId: string;
  }>();

  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  const chapter = SECTIONS.find(
    (section) => section.sectionId === sectionId
  )?.chapters.find((chapter) => chapter.chapterId === chapterId);

  const levelData = LEVEL_DATA[`${sectionId}/${chapterId}/${gameId}`];

  const resetGame = useCallback(() => {
    setIsLevelComplete(false);
    isRunningRef.current = false;
    if (levelData) {
      setLevelData(levelData);
      setGirlCoordinates({
        x: Number(levelData.girl.split(",")[0]),
        y: Number(levelData.girl.split(",")[1]),
      });
      setPosition({
        x: Number(levelData.girl.split(",")[0]) * squareSize,
        y: Number(levelData.girl.split(",")[1]) * squareSize,
      });
      setPineappleCoordinates(levelData.pineapples);
      deltaXRef.current = 0;
      deltaYRef.current = 0;
    } else {
      setLevelData(null);
      setGirlCoordinates(null);
      setPineappleCoordinates(null);
      setPosition(null);
    }
  }, [squareSize, levelData]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    console.log(
      "pineappleCoordinates",
      pineappleCoordinates,
      pineappleCoordinates?.length
    );
    if (!levelData) return;
    if (pineappleCoordinates?.length === 0) {
      setIsLevelComplete(true);
    }
  }, [pineappleCoordinates, levelData]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fffbea] via-[#FFEAEA] to-[#fff7ea]">
      {/* Overlays */}
      {isLevelComplete && (
        <LevelCompleteOverlay
          onReset={resetGame}
          nextLevel={`/chapters/${sectionId}/${chapterId}/${
            Number(gameId) + 1
          }`}
        />
      )}
      {/* {isGameOver && <GameOverOverlay />} */}

      <Navbar
        chapter={chapter}
        sectionId={sectionId}
        currentLevel={Number(gameId)}
      />
      <div className="w-full flex flex-col py-4 items-center justify-center h-[calc(100vh-64px)] max-w-[960px] mx-auto px-4 md:px-12">
        <Ground />
        <ControlPanel resetGame={resetGame} />
      </div>
    </div>
  );
}
