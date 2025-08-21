import ChapterItem, { Chapter } from "@/components/chapterItem";
import Navbar from "@/components/common/navbar";
import { BellRingIcon } from "lucide-react";

const CHAPTERS: Chapter[] = [
  {
    id: 0,
    title: "Breakfast",
    slug: "breakfast",
    description:
      "Myra has just woken up. There is a loud noise coming from somewhere. It's her rumbling tummy. Help her find some delicious pineapples before the noise wakes up all the birds in her garden.",
    levels: 11,
  },
  {
    id: 1,
    title: "Happy birthday Myra!",
    slug: "happy-birthday",
    description:
      "It's Myra's birthday today. Let's wish her a happy birthday by helping her complete a special song.",
    levels: 13,
  },
  {
    id: 2,
    title: "Art Class",
    slug: "art-class",
    description:
      "Myra is an art class today. And guess what? yes she is hungry. Help her find some delicious pineapples before the paint dries.",
    levels: 10,
  },
];

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffbea] via-[#FFEAEA] to-[#fff7ea] pb-12">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="p-4 flex flex-col gap-4">
        <div className="w-full text-right gap-2 text-gray-600 hover:text-gray-800 transition-colors">
          Your progress will be tracked only on this device
        </div>

        <div className="text-center mt-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Every day is a new adventure
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow Myra as she goes about her day.&nbsp; Each chapter brings new
            adventures!
          </p>
        </div>
      </div>

      {/* Main Content */}
      {/* Chapters grid - 2x2 layout */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-12 max-w-screen-xl mx-auto">
        {CHAPTERS.map((chapter) => (
          <ChapterItem key={chapter.id} chapter={chapter} />
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="w-full text-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mt-12 flex items-center justify-center">
        <BellRingIcon className="w-4 h-4" />
        <span>Remember to keep coming back for more chapters!</span>
      </div>
    </div>
  );
}
