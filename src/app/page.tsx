"use client";

import ControlPanel from "@/components/controlPannel";
import Ground from "@/components/ground/ground";
import { useGame } from "@/contexts/gameContext";

export default function Home() {
  const { isClient } = useGame();
  if (!isClient) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-screen-sm mx-auto">
      <Ground />
      <ControlPanel />
    </div>
  );
}
