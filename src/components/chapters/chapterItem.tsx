"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "../common/primaryCta";
import { Button } from "../ui/button";
import { useLevel } from "@/contexts/levelContext";
import { cn } from "@/lib/utils";

export interface Chapter {
  chapterIndex: number;
  title: string;
  chapterId: string;
  description: string;
  levels: number;
  isComingSoon: boolean;
}

export default function ChapterItem({
  sectionId,
  chapter,
}: {
  sectionId: string;
  chapter: Chapter;
}) {
  const { title, description, levels, isComingSoon, chapterId } = chapter;
  const { completedLevels } = useLevel();

  const firstIncompleteLevel = Array.from({ length: levels + 1 }).findIndex(
    (_, index) => !completedLevels.has(`${sectionId}/${chapterId}/${index + 1}`)
  );

  const isCompleted = firstIncompleteLevel === levels;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400/5 to-yellow-400/5 shadow-lg">
      {/* Status indicators */}
      {isCompleted ? (
        <div className="hidden md:flex gap-1 w-full justify-end px-8 py-2">
          <div className="flex items-center gap-1 text-green-600">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-sm font-medium">Completed</span>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex gap-1 w-full h-9 justify-end" />
      )}

      <div className="px-4 md:px-8 pt-4 md:pt-0 pb-8 md:pb-12">
        {/* Header section */}
        <div className="flex items-start justify-between mb-4 md:mb-6 relative">
          <h3 className="hidden md:block text-2xl font-bold leading-tight text-gray-900">
            {title}
          </h3>

          {isComingSoon ? (
            <Button className="text-sm bg-black/10 text-gray-600 font-anton ml-auto md:ml-0">
              Coming Soon
            </Button>
          ) : (
            <PrimaryButton
              href={
                isCompleted
                  ? `/chapters/${sectionId}/${chapterId}/${1}`
                  : `/chapters/${sectionId}/${chapterId}/${
                      firstIncompleteLevel + 1
                    }`
              }
              className="text-4xl px-3 py-1 ml-auto md:ml-0"
            >
              PLAY
            </PrimaryButton>
          )}
        </div>

        <h1 className="md:hidden text-2xl font-bold leading-tight text-gray-900 mb-2">
          {title}
          {isCompleted && (
            <span className="text-sm font-medium text-green-600 ml-2">
              <Star className="w-3 h-3 fill-current inline-block mt-[-2px]" />
            </span>
          )}
          {isCompleted && (
            <span className="text-sm font-medium text-green-600 ml-1">
              Completed
            </span>
          )}
        </h1>

        <div className="space-y-4">
          <p className="text-base leading-relaxed text-gray-600">
            {description}
          </p>
        </div>

        <div className="flex items-center flex-wrap mt-4">
          {Array.from({ length: levels }).map((_, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <div className="w-4 h-1 bg-gray-700/10 mt-1.5" />}
              <Link
                href={`/chapters/${sectionId}/${chapterId}/${index + 1}`}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mt-2 hover:scale-125 transition-all duration-300",
                  completedLevels.has(`${sectionId}/${chapterId}/${index + 1}`)
                    ? "bg-[#A0D94A]"
                    : "bg-white"
                )}
              >
                {index + 1}
              </Link>
            </div>
          ))}
        </div>

        {/* coming soon overlay */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center" />
        )}
      </div>
    </div>
  );
}
