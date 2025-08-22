import { LevelData } from "@/contexts/gameContext";

export const LEVEL_DATA: Record<string, LevelData> = {
  "hungry-for-pineapples/breakfast/1": {
    ground: new Set(["2,3", "3,3", "4,3", "5,3"]),
    bounds: new Set(["1,3", "2,2", "3,2", "4,2", "5,2", "6,3", "2,4", "3,4", "4,4", "5,4"]),
    girl: "3,3",
    pineapples: ["4,3"],
    instructions: "",
    vocabulary: ["move", "left"],
  }
}