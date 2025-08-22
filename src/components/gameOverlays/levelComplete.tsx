import React from "react";
import { useLottie } from "lottie-react";
import confetti from "./confetti.json";
import { Button } from "../ui/button";

export default function LevelCompleteOverlay({
  onReset,
}: {
  onReset: () => void;
}) {
  const options = {
    animationData: confetti,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-[1000] bg-black/50 flex items-center justify-center">
      {View}
      <Button onClick={onReset}>Reset Level</Button>
    </div>
  );
}
