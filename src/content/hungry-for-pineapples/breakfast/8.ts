import { LevelData } from "@/contexts/gameContext";

export default {
  ground: new Set([
    "5,2",
    "4,2",
    "3,2",
    "2,2",
    "2,3",
    "2,4",
    "2,5",
    "3,5",
    "4,5",
    "5,5",
  ]),
  bounds: new Set([
    "3,3",
    "4,3",
    "5,3",
    "6,2",
    "5,1",
    "4,1",
    "3,1",
    "2,1",
    "1,2",
    "1,3",
    "1,4",
    "1,5",
    "2,6",
    "3,6",
    "4,6",
    "5,6",
    "6,5",
    "5,4",
    "4,4",
    "3,4",
  ]),
  girl: "5,2",
  pineapples: ["2,2", "2,5", "5,5"],
  instructions: `## More than two Pineapples

Continue playing! You are doing great. You need to eat all the pineapples.

You now have the ability to move in all directions, \`Move left.\` \`Move right.\` \`Move up.\` \`Move down.\`

Figure out a way to eat all the pineapples.

---

### Tips

- You can move multiple times by combining and writing sentences.

*Have fun!*`,
  vocabulary: ["Move", "up.", "down.", "left.", "right."],
  initialPrompt: "",
} as LevelData;
