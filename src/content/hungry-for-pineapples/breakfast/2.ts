import { LevelData } from "@/contexts/gameContext";

export default {
  ground: new Set([    
    "2,4",
    "3,4",
    "4,4",
    "5,4",
    
  ]),
  bounds: new Set([
    "2,3",
    "3,3",
    "4,3",
    "5,3",

    "1,4",
    "6,4",

    "2,5",
    "3,5",
    "4,5",
    "5,5",
  ]),
  girl: "3,4",
  pineapples: ["4,4"],
  instructions: `## How to Play

Now it's your turn. To begin, we have kept things super simple.
  
For this level, Myra just needs to move to the right **1** squares, 
so you need to write the following instruction - 
\`Move right.\`

So here's what you need to do.

1. Go to the **PLAY** section
2. Type "Move right." and RUN
3. Remember, the first letter of the the sentence is a capital letter - "Move"
4. Remember, the sentence ends with a full stop - "right."

---

*Have fun!*`,
  vocabulary: ["Move", "right."],
  initialPrompt: "",
} as LevelData;
