import { LevelData } from "@/contexts/gameContext";

export default {
  ground: new Set(["3,3", "3,4", "3,5", "4,3", "4,4", "4,5"]),
  bounds: new Set([
    "3,2",
    "2,3",
    "2,4",
    "2,5",
    "3,6",

    "4,2",
    "5,3",
    "5,4",
    "5,5",
    "4,6",
  ]),
  girl: "4,4",
  pineapples: ["4,5"],
  instructions: `## How to Play

Myra can also move up and down.
  
For this level, Myra has two options. She can move up - \`Move up.\` or move down - \`Move down.\`

You need to decide which way Myra should move.

1. Go to the **PLAY** section
2. Type "Move up." or "Move down."
3. We know you will be able to make the right choice

---

### Tips

- Do not forget to write the words with correct capital letters and full stops

*Have fun!*`,
  vocabulary: ["Move", "up.", "down."],
  initialPrompt: "",
} as LevelData;
