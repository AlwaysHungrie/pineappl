"use client";

import { DIRECTIONS } from "@/contexts/gameContext";
import { useCharacter } from "@/contexts/characterContext";
import { useState } from "react";
import InstructionPanel from "./instructionPanel";
import PlayPanel from "./playPanel";
import VocabularPanel from "./vocabularPanel";
import GenerateCodePanel from "./generateCodePanel";

const PANELS = [
  { id: "instructions", label: "Instructions" },
  { id: "play", label: "Play" },
  { id: "vocabulary", label: "Vocabulary" },
  { id: "generated code", label: "Generated Code" },
] as const;

export default function ControlPanel() {
  const [activePanel, setActivePanel] =
    useState<(typeof PANELS)[number]["id"]>("instructions");
  const { move } = useCharacter();

  const handleMove = (direction: (typeof DIRECTIONS)[number]) => {
    move(direction);
  };

  const renderPanel = () => {
    switch (activePanel) {
      case "instructions":
        return <InstructionPanel />;
      case "play":
        return <PlayPanel />;
      case "vocabulary":
        return <VocabularPanel />;
      case "generated code":
        return <GenerateCodePanel />;
    }
  };

  const renderPanelButton = (panel: (typeof PANELS)[number]) => {
    let buttonBaseClasses =
      "px-2 text-sm font-medium transition-all duration-200 text-gray-600 rounded-t-sm cursor-pointer";
    if (panel.id === "play") {
      buttonBaseClasses = `${buttonBaseClasses} font-anton uppercase`;
    } else if (panel.id === "generated code") {
      buttonBaseClasses = `${buttonBaseClasses} ml-auto`;
    }

    let buttonActiveClasses = "bg-white border-b-2 border-primary shadow-sm";
    if (panel.id === "play") {
      buttonActiveClasses = `${buttonActiveClasses} text-primary`;
    }

    let buttonInactiveClasses = "bg-gray-50 hover:text-gray-800 hover:bg-white";

    return (
      <button
        key={panel.id}
        onClick={() => setActivePanel(panel.id)}
        className={`${buttonBaseClasses} ${
          activePanel === panel.id ? buttonActiveClasses : buttonInactiveClasses
        }`}
      >
        <div className="flex flex-col items-center space-y-1">
          <span className="capitalize">{panel.label}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="h-[35%] mt-4 w-full max-w-4xl mx-auto flex flex-col">
      {/* Panel Navigation */}
      <div className="flex rounded-t-2xl gap-1">
        {PANELS.map((panel) => renderPanelButton(panel))}
      </div>

      {/* Panel Content */}
      <div className="flex-1 bg-white overflow-y-scroll rounded-b-lg shadow-xl border border-gray-100 ">
        {renderPanel()}
      </div>
    </div>
  );
}
