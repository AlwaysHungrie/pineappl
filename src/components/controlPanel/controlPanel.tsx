"use client";

import { DIRECTIONS, useGame } from "@/contexts/gameContext";
import { useCharacter } from "@/contexts/characterContext";
import { useCallback, useEffect, useRef, useState } from "react";
import InstructionPanel from "./instructionPanel";
import PlayPanel from "./playPanel";
import VocabularPanel from "./vocabularPanel";
import GenerateCodePanel from "./generateCodePanel";
import IncorrectWord from "../gameOverlays/incorrectWord";
import IncorrectCommand from "../gameOverlays/incorrectCommand";

export interface Command {
  sentence: string;
  index: number;
  command: string | null;
  error: boolean;
}

const PANELS = [
  { id: "instructions", label: "Info" },
  { id: "play", label: "Play" },
  { id: "vocabulary", label: "Vocabulary" },
  { id: "generated code", label: "Generated Code" },
] as const;

export default function ControlPanel({ resetGame }: { resetGame: () => void }) {
  const [activePanel, setActivePanel] =
    useState<(typeof PANELS)[number]["id"]>("instructions");

  const { levelData, girlCoordinates } = useGame();
  const { move, isRunningRef } = useCharacter();

  const [prompt, setPrompt] = useState("");
  const [incorrectWords, setIncorrectWords] = useState<Set<string>>(new Set());
  const [isIncorrectWordsDialogOpen, setIsIncorrectWordsDialogOpen] =
    useState(false);
  const [isIncorrectCommandDialogOpen, setIsIncorrectCommandDialogOpen] =
    useState(false);
  const [commands, setCommands] = useState<Command[] | null>(null);
  const [generatedCode, setGeneratedCode] = useState("");

  const currentCommandRef = useRef<number | null>(null);

  const vocabulary = levelData?.vocabulary;
  const initialPrompt = levelData?.initialPrompt;

  const resetPrompt = useCallback(() => {
    setPrompt(initialPrompt ?? "");
    resetGame();
  }, [initialPrompt, resetGame]);

  const stopExecution = useCallback(async () => {
    currentCommandRef.current = null;
    isRunningRef.current = false;
    setCommands(null);
  }, []);

  const checkVocabulary = useCallback(
    (prompt: string) => {
      const words = prompt.split(" ");
      const incorrectWords = words.filter(
        (word) => !vocabulary?.find((v) => v === word)
      );
      if (incorrectWords.length > 0) {
        setIsIncorrectWordsDialogOpen(true);
        setIncorrectWords(new Set(incorrectWords));
        return false;
      }
      return true;
    },
    [vocabulary]
  );

  const generateCommands = useCallback((prompt: string) => {
    return prompt.split(".").map((sentence, index) => {
      const words = sentence.trim().split(" ").filter(Boolean);

      if (words.length === 0) {
        return {
          sentence: sentence.trim(),
          index,
          command: null,
          error: false,
        };
      }

      words[words.length - 1] = `${words[words.length - 1]}.`;

      // Move command - move(direction)
      if (words[0] === "Move" && words.length > 1) {
        const direction = words[1];
        const isValidDirection = ["left.", "right.", "up.", "down."].includes(
          direction
        );
        return {
          sentence: sentence.trim(),
          index,
          command: isValidDirection ? `move(${direction.slice(0, -1)})` : null,
          error: !isValidDirection,
        };
      }

      return { sentence: sentence.trim(), index, command: null, error: true };
    });
  }, []);

  const executeCommand = useCallback(
    async (commandIndex: number | null) => {
      if (!isRunningRef.current || commandIndex === null) {
        currentCommandRef.current = null;
        return;
      }

      // Skip delay if just started
      if (commandIndex === 0) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      const command = commands?.[commandIndex];
      if (command?.command && command.command.startsWith("move(")) {
        const direction = command.command.split("(")[1].split(")")[0];
        await move(direction as "left" | "right" | "up" | "down");
        setGeneratedCode((prev) => {
          if (commandIndex === 0) {
            return `move("${direction}")`;
          }
          return `${prev}\nmove("${direction}")`;
        });
        currentCommandRef.current = commandIndex + 1;
      } else {
        currentCommandRef.current = null;
      }
    },
    [commands, move]
  );

  const generateAndRun = useCallback(async () => {
    const _prompt = prompt.trim();
    const isVocabularyCorrect = checkVocabulary(_prompt);
    if (!isVocabularyCorrect) return;

    const commands = generateCommands(prompt);
    setCommands(commands);

    const isCommandCorrect = commands.every(({ error }) => !error);
    if (!isCommandCorrect) {
      setIsIncorrectCommandDialogOpen(true);
      return;
    }

    currentCommandRef.current = 0;
    isRunningRef.current = true;
  }, [checkVocabulary, generateCommands, prompt]);

  useEffect(() => {
    resetPrompt();
  }, [resetPrompt]);

  useEffect(() => {
    if (commands === null) {
      return;
    }

    executeCommand(currentCommandRef.current);
  }, [girlCoordinates, commands]);

  useEffect(() => {
    if (commands === null) {
      resetGame();
    }
  }, [commands, resetGame]);

  const renderPanel = () => {
    switch (activePanel) {
      case "instructions":
        return <InstructionPanel />;
      case "play":
        return (
          <PlayPanel
            prompt={prompt}
            setPrompt={setPrompt}
            resetPrompt={resetPrompt}
            generateAndRun={generateAndRun}
            stopExecution={stopExecution}
          />
        );
      case "vocabulary":
        return <VocabularPanel />;
      case "generated code":
        return <GenerateCodePanel generatedCode={generatedCode} />;
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
    if (panel.id === "play") {
      buttonInactiveClasses = `${buttonInactiveClasses} text-primary hover:text-primary`;
    }

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
    <div className="h-[40%] mt-4 w-full max-w-[960px] mx-auto flex flex-col">
      {/* Panel Navigation */}
      <div className="flex rounded-t-2xl gap-1">
        {PANELS.map((panel) => renderPanelButton(panel))}
      </div>

      {/* Panel Content */}
      <div className="flex-1 bg-white overflow-y-scroll rounded-b-lg shadow-xl border border-gray-100 ">
        {renderPanel()}
      </div>

      {/* Incorrect Words Dialog */}
      <IncorrectWord
        isOpen={isIncorrectWordsDialogOpen}
        onClose={() => setIsIncorrectWordsDialogOpen(false)}
        vocabulary={vocabulary ?? []}
        resetAndClose={() => {
          setIsIncorrectWordsDialogOpen(false);
          resetPrompt();
        }}
        prompt={prompt}
        incorrectWords={incorrectWords}
      />

      {/* Incorrect Command Dialog */}
      <IncorrectCommand
        isOpen={isIncorrectCommandDialogOpen}
        onClose={() => setIsIncorrectCommandDialogOpen(false)}
        commands={commands ?? []}
      />
    </div>
  );
}
