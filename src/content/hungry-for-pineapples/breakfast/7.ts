import { LevelData } from "@/contexts/gameContext";

export default {
  ground: new Set(["5,2","4,2","3,2","2,2","2,3","2,4","2,5"]),
  bounds: new Set(["3,3","4,3","5,3","6,2","5,1","4,1","3,1","2,1","1,2","1,3","1,4","1,5","2,6","3,5","3,4"]),
  girl: "5,2",
  pineapples: ["2,2", "2,5"],
  instructions: `## More than one Pineapple

To finish this level, you need to eat all the pineapples.

You now have the ability to move in all directions, \`Move left.\` \`Move right.\` \`Move up.\` \`Move down.\`

Figure out a way to eat both the pineapples.

---

### Tips

- You can move multiple times by combining and writing sentences.

*Have fun!*`,
  vocabulary: ["Move", "up.", "down.", "left.", "right."],
  initialPrompt: "",
} as LevelData;
