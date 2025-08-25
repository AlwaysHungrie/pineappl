import { LevelData } from "@/contexts/gameContext";

export default {
  ground: new Set([
    "2,2",
    "3,2",
    "4,2",
    "5,2",
    "5,3",
    "4,3",
    "3,3",
    "2,3",
    "2,4",
    "3,4",
    "4,4",
    "5,4",
    "5,5",
    "4,5",
    "3,5",
    "2,5",
  ]),
  bounds: new Set([
    "2,1",
    "3,1",
    "4,1",
    "5,1",
    "6,2",
    "6,3",
    "6,4",
    "5,6",
    "6,5",
    "4,6",
    "3,6",
    "2,6",
    "1,5",
    "1,4",
    "1,3",
    "1,2",
  ]),
  girl: "2,2",
  pineapples: [
    "3,2",
    "4,2",
    "5,2",
    "5,3",
    "4,3",
    "3,3",
    "2,3",
    "2,4",
    "3,4",
    "4,4",
    "5,4",
    "5,5",
    "4,5",
    "3,5",
    "2,5",
  ],
  instructions: `## Pineapple Bonanza

Wohoo! You have made it to the last level of this chapter.

To celebrate, we are having a party! Eat all the pineapples.

If you are finding it difficult, try following a pattern. 
Clear the first row. Then move to the second row. And so on...

---

### Tips

- There are so many ways to finish this level, try playing this level again
- Try following different neat and satisfying patterns

*Have fun!*`,
  vocabulary: ["Move", "down.", "left.", "up.", "right."],
  initialPrompt:
    "Move right. Move right. Move right. Move down.\nMove left. Move left. Move left. Move down.",
} as LevelData;
