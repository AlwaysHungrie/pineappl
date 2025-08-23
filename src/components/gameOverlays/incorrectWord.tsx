import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Fragment } from "react";

export default function IncorrectWord({
  isOpen,
  onClose,
  vocabulary,
  resetAndClose,
  prompt,
  incorrectWords,
}: {
  isOpen: boolean;
  onClose: () => void;
  vocabulary: string[];
  resetAndClose: () => void;
  prompt: string;
  incorrectWords: Set<string>;
}) {
  const renderPrompt = () => {
    const words = prompt.split(" ");
    return words.map((word, index) => {
      const isIncorrect = incorrectWords.has(word);
      return (
        <Fragment key={`${word}-${index}`}>
          <span className={isIncorrect ? "bg-red-500/20 rounded-sm" : ""}>
            {word}
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg border-0 shadow-xl bg-white rounded-2xl p-6 gap-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader className="text-center gap-2">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Hold on! That's not quite right
          </DialogTitle>
          <p className="text-gray-600">
            It looks like you used some words in your instructions that are not
            recognized by the computer for this level.
          </p>
        </DialogHeader>

        {/* Current Prompt with Highlighted Incorrect Words */}
        <div className="text-gray-600 text-sm mt-8">
          Make sure you type the words exactly as they are written, including
          spellings, capital letters and full stops.
        </div>
        <div className="bg-gray-50 rounded-md border border-gray-200 p-2 mt-2">
          {renderPrompt()}
        </div>

        {/* Available Vocabulary */}
        <div className="border-t border-gray-200 mt-4">
          <h1 className="text-gray-800 mt-3 mb-2">
            Remember you are only allowed to use the following words:
          </h1>
          <div className="text-base text-gray-700 leading-relaxed mb-4">
            {vocabulary?.map((word) => (
              <div
                key={word}
                className="inline-block bg-gray-100 rounded-md px-2 mr-2 mb-2"
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            className="px-8 py-6 text-2xl font-anton uppercase cursor-pointer"
            onClick={resetAndClose}
          >
            Reset and Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
