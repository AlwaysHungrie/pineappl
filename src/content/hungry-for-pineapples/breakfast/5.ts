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
  pineapples: ["3,3"],
  instructions: `## Combining Sentences

If you remember from the first level, you can write multiple sentences.
  
For this level, Myra has to first move left **1** square - \`Move left.\`

Then again she has two options. She can move up - \`Move up.\` or move down - \`Move down.\`


1. Go to the **PLAY** section
2. Type "Move left."
3. Type "Move up." or "Move down."
4. We know you will be able to make the right choice

---

### Tips

- Do not forget to write the words with correct capital letters and full stops

You final instructions should look like either one of these two options:

- \`Move left. Move up.\`
- \`Move left. Move down.\`

*Have fun!*`,
  vocabulary: ["Move", "up.", "down.", "left."],
  initialPrompt: "",
} as LevelData;
