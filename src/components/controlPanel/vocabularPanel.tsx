import { useGame } from "@/contexts/gameContext";

export default function VocabularPanel() {
  const { levelData } = useGame();
  const vocabulary = levelData?.vocabulary;

  return (
    <div className="px-4 pb-4">
      <h1 className="text-gray-800 mt-3 mb-2">
        Only the following words are allowed for this level:
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
  );
}
