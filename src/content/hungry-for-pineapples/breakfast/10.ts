import { LevelData } from "@/contexts/gameContext";

export default {
  ground: new Set(["6,1","5,1","5,2","4,2","4,3","3,3","3,4","2,4","2,5","1,5","1,6"]),
  bounds: new Set(["6,0","5,0","4,1","3,2","2,3","1,4","0,5","1,7","0,6","2,6","3,5","4,4","5,3","6,2","7,1"]),
  girl: "6,1",
  pineapples: ["1,6"],
  instructions: `## A long level

Wow! This is level is so long, You will need some patience.

Figure out a way to eat all the pineapples by using \`Move down.\` and \`Move left.\`

You can use the copy and paste feature to help you type faster.

1. Select a portion of text
2. Right click and select "Copy"
3. Right click and select "Paste"

---

### Tips

- This is a long level, you will need to type a lot of sentences
- Copy and paste is an important skill to have
- Try asking someone around you for help if you do not know how to do it


*Have fun!*`,
  vocabulary: ["Move", "down.", "left."],
  initialPrompt: "Move left. Move down.",
} as LevelData;
