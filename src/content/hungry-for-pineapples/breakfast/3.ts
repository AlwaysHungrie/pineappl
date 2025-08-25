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
  girl: "4,4",
  pineapples: ["3,4"],
  instructions: `## How to Play

Let's move in a different direction.
  
For this level, Myra just needs to move to the left **1** squares, 
so you need to write the following instruction - 
\`Move left.\`

So here's what you need to do.

1. Go to the **PLAY** section
2. Type "Move left." and RUN
3. Remember, the first letter of the the sentence is a capital letter - "Move"
4. Remember, the sentence ends with a full stop - "left."

---

*Have fun!*`,
  vocabulary: ["Move", "left."],
  initialPrompt: "",
} as LevelData;
