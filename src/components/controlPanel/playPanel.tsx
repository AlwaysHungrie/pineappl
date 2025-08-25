import { Button } from "../ui/button";
import { Play, RefreshCw } from "lucide-react";
import { useCharacter } from "@/contexts/characterContext";

export default function PlayPanel({
  prompt,
  setPrompt,
  resetPrompt,
  generateAndRun,
  stopExecution,
}: {
  prompt: string;
  setPrompt: (prompt: string) => void;
  resetPrompt: () => void;
  generateAndRun: () => void;
  stopExecution: () => void;
}) {
  const { isRunningRef } = useCharacter();
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
        autoFocus
      />

      <div className="h-0 relative">
        <div className="absolute bottom-2 right-2 flex gap-2">
          {!isRunningRef.current ? (
            <>
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
            </>
          ) : (
            <Button
              className="px-2 py-1 text-md font-anton uppercase cursor-pointer"
              onClick={stopExecution}
            >
              Stop
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
