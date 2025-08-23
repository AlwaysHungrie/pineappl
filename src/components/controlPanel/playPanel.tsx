import { useGame } from "@/contexts/gameContext";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Play, RefreshCw } from "lucide-react";
import IncorrectWord from "../gameOverlays/incorrectWord";

export default function PlayPanel() {
  const { levelData } = useGame();

  const [prompt, setPrompt] = useState("");
  const [incorrectWords, setIncorrectWords] = useState<Set<string>>(new Set());
  const [isIncorrectWordsDialogOpen, setIsIncorrectWordsDialogOpen] =
    useState(false);

  const vocabulary = levelData?.vocabulary;
  const initialPrompt = levelData?.initialPrompt;

  const resetPrompt = useCallback(() => {
    setPrompt(initialPrompt ?? "");
  }, [initialPrompt]);

  const checkVocabulary = useCallback(
    (prompt: string) => {
      const words = prompt.split(" ");
      const incorrectWords = words.filter(
        (word) => !vocabulary?.find((v) => v === word)
      );
      if (incorrectWords.length > 0) {
        setIsIncorrectWordsDialogOpen(true);
        setIncorrectWords(new Set(incorrectWords));
      }
    },
    [vocabulary]
  );

  useEffect(() => {
    resetPrompt();
  }, [resetPrompt]);

  const generateAndRun = useCallback(() => {
    checkVocabulary(prompt);
  }, [checkVocabulary, prompt]);

  return (
    <div className="px-2 pb-2 flex flex-col h-full">
      <h1 className="text-gray-800 text-sm mt-2 mb-2">
        Write instructions to move Myra
      </h1>
      <textarea
        className="flex-1 w-full p-2 bg-gray-100 border border-gray-300 rounded-md resize-none min-h-0"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write instructions here..."
      />

      <div className="h-0 relative">
        <div className="absolute bottom-2 right-2 flex gap-2">
          <Button
            className="px-2 py-1 text-md font-anton uppercase cursor-pointer"
            onClick={resetPrompt}
          >
            Reset
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            className="px-2 py-1 text-md font-anton uppercase cursor-pointer"
            onClick={generateAndRun}
          >
            Generate And Run
            <Play className="w-4 h-4" />
          </Button>
        </div>
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
    </div>
  );
}
