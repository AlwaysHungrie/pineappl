import { LevelData } from "@/contexts/gameContext";

export default {
  ground: new Set([
    "2,3",
    "3,3",
    "4,3",
    "5,3",
    "2,4",
    "3,4",
    "4,4",
    "5,4",
    "2,5",
    "3,5",
    "4,5",
    "5,5",
  ]),
  bounds: new Set([
    "1,3",
    "2,2",
    "3,2",
    "4,2",
    "5,2",
    "6,3",
    "2,6",
    "3,6",
    "4,6",
    "5,6",
  ]),
  girl: "2,4",
  pineapples: ["5,4"],
  instructions: `# Hungry for Pineapples: Breakfast

Myra has just woken up. Her rumbling tummy is making a lot of noise. Help her find some delicious pineapples.

---

## Welcome to Pineappl!

We are so excited to be with you on this amazing adventure. 

Pineappl is a special game where you do not control the player using your arrow keys. You need to 
write down instructions for the computer to move the player.

## How to Play

For this level, Myra needs to move to the right **3** squares, 
so you need to write the following instruction "Move right" three times - 
\`Move right. Move right. Move right.\`

So here's what you need to do.

1. Go to the **PLAY** section
2. For this level, instructions will already be written for you
3. Click on the "Generate And Run" button
4. Watch Myra eat the Pineapple

---

### Tips
- For each level, you can only use certain words while writing instructions 
- The available words will be provided in the *Vocabulary* section

*Have fun!*`,
  vocabulary: ["Move", "right.", "left.", "up.", "down."],
  initialPrompt: "Move right. Move right. Move right.",
} as LevelData;
