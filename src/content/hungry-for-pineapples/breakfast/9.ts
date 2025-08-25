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
    "5,4",
    "4,4",
    "1,2",
    "2,6",
    "6,5",
    "5,1",
  ]),
  bounds: new Set([
    "3,3",
    "4,3",
    "5,3",
    "6,3",
    "6,2",
    "6,1",
    "5,0",
    "4,1",
    "3,1",
    "2,1",
    "1,1",
    "0,2",
    "1,3",
    "1,4",
    "3,4",
    "1,5",
    "1,6",
    "2,7",
    "3,6",
    "4,6",
    "5,6",
    "6,6",
    "7,5",
    "6,4",
  ]),
  girl: "5,2",
  pineapples: ["2,2", "2,5", "5,5", "4,4"],
  instructions: `## A beautiful level

Wow! This is level is so beautiful. You need to eat all the pineapples.

You have the ability to move in all directions, \`Move left.\` \`Move right.\` \`Move up.\` \`Move down.\`

Figure out a way to eat all the pineapples.

---

### Tips

- It does not matter in which order you eat the pineapples.

*Have fun!*`,
  vocabulary: ["Move", "up.", "down.", "left.", "right."],
  initialPrompt: "",
} as LevelData;
