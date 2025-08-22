"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "../common/primaryCta";
import { Button } from "../ui/button";

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
  const isCompleted = false;

  const firstIncompleteLevel = 1;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400/5 to-yellow-400/5 shadow-lg">
      <div className="px-8 pt-8 pb-12">
        {/* Header section */}
        <div className="flex items-start justify-between mb-6 relative">
          {/* Status indicators */}
          {isCompleted && (
            <div className="flex flex-col gap-1 absolute -top-7.5 -right-5.5">
              <div className="flex items-center gap-1 text-green-600">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            </div>
          )}

          <h3 className="text-2xl font-bold leading-tight text-gray-900">
            {title}
          </h3>

          {isComingSoon ? (
            <Button className="text-sm bg-black/10 text-gray-600 font-anton">
              Coming Soon
            </Button>
          ) : (
            <PrimaryButton
              href={`/chapters/${sectionId}/${chapterId}/${firstIncompleteLevel}`}
              className="text-4xl px-3 py-1"
            >
              PLAY
            </PrimaryButton>
          )}
        </div>

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
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-medium mt-2 hover:scale-125 transition-all duration-300"
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
