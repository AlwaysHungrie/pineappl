"use client";

import Navbar from "@/components/common/navbar";
import ControlPanel from "@/components/controlPannel";
import Ground from "@/components/ground/ground";
import { SECTIONS } from "@/content/chapters";
import { useGame } from "@/contexts/gameContext";
import { useParams } from "next/navigation";

export default function Home() {
  const { isClient } = useGame();
  const { sectionId, chapterId, gameId } = useParams<{
    sectionId: string;
    chapterId: string;
    gameId: string;
  }>();

  if (!isClient) {
    return null;
  }

  const chapter = SECTIONS.find(
    (section) => section.sectionId === sectionId
  )?.chapters.find((chapter) => chapter.chapterId === chapterId);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fffbea] via-[#FFEAEA] to-[#fff7ea]">
      <Navbar
        chapter={chapter}
        sectionId={sectionId}
        currentLevel={Number(gameId)}
      />
      <div className="w-full flex flex-col py-4 items-center justify-center h-[calc(100vh-64px)] max-w-screen-sm mx-auto">
        <Ground />
        <ControlPanel />
      </div>
    </div>
  );
}
