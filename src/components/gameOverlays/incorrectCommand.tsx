import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Fragment } from "react";
import { Command } from "../controlPanel/controlPanel";

export default function IncorrectCommand({
  isOpen,
  onClose,
  commands,
}: {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}) {
  const renderPrompt = () => {
    const firstIncorrectIndex = commands.findIndex(({ error }) => error);
    return commands.map(({ sentence, index, error }) => {
      return (
        <Fragment key={`${sentence}-${index}`}>
          <span
            className={
              error && index === firstIncorrectIndex
                ? "bg-red-500/20 rounded-sm"
                : ""
            }
          >
            {sentence}
          </span>
          {index < commands.length - 1 && ". "}
        </Fragment>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="md:max-w-lg border-0 shadow-xl bg-white rounded-2xl p-6 gap-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader className="text-center gap-2">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Hold on! That&apos;s not quite right
          </DialogTitle>
          <p className="text-gray-600">
            The computer could not understand a part of your instructions.
          </p>
        </DialogHeader>

        {/* Current Prompt with Highlighted Incorrect Words */}
        <div className="text-gray-600 text-sm mt-8">
          Make sure all the instructions you typed follow their correct format
          as discussed in the Info sections.
        </div>
        <div
          className="bg-gray-50 rounded-md border border-gray-200 p-2 mt-2 mb-8"
          style={{
            maxHeight: "120px",
            overflowY: "auto",
          }}
        >
          {renderPrompt()}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            className="px-8 py-6 text-2xl font-anton uppercase cursor-pointer"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
