"use client";

import { useState } from "react";
import ChapterItem, { Chapter } from "./chapterItem";
import { ChevronDownIcon } from "lucide-react";
import { SECTIONS } from "@/content/chapters";

export interface Section {
  sectionIndex: number;
  sectionId: string;
  title: string;
  chapters: Chapter[];
}

export default function Chapters() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-8 mt-12">
      {SECTIONS.map(({ title, chapters }, index) => {
        const isOpen = openSection === index;
        return (
          <div
            key={title}
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen
                ? "bg-blue-500/5"
                : "bg-blue-500/20 hover:bg-blue-500/30 cursor-pointer"
            }`}
            onClick={() => !isOpen && toggleSection(index)}
          >
            <div className="w-full max-w-screen-xl mx-auto">
              <div className="flex items-center gap-4 p-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl text-lg font-bold bg-gradient-to-br from-orange-400 to-orange-600/10 text-white">
                  {index + 1}
                </div>
                <h2 className="text-3xl text-gray-900 font-bold flex-1">
                  <span className="font-normal">CHAPTER:</span> {title}
                </h2>
                <div className="flex items-center gap-2 text-2xl text-gray-600">
                  {!isOpen && <span>View Levels</span>}
                  <ChevronDownIcon
                    className={`w-6 h-6 transition-transform duration-500 ease-in-out ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </div>
              </div>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8 px-6 pb-6">
                  {chapters.map((chapter) => (
                    <ChapterItem key={chapter.chapterIndex} chapter={chapter} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
