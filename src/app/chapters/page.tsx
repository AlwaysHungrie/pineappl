import ChapterItem, { Chapter } from "@/components/chapters/chapterItem";
import Chapters from "@/components/chapters/chapters";
import Navbar from "@/components/common/navbar";
import { BellRingIcon } from "lucide-react";

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
      <Chapters />

      {/* Bottom spacing */}
      <div className="w-full text-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mt-12 flex items-center justify-center">
        <BellRingIcon className="w-4 h-4" />
        <span>Remember to keep coming back for more chapters!</span>
      </div>
    </div>
  );
}
