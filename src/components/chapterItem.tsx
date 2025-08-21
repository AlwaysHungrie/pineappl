"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "./common/primaryCta";

export interface Chapter {
  id: number;
  title: string;
  slug: string;
  description: string;
  levels: number;
}

export default function ChapterItem({ chapter }: { chapter: Chapter }) {
  const { id, title, slug, description, levels } = chapter;

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400/5 to-yellow-400/5 shadow-lg"
    >
      <div className="px-8 pt-8 pb-12">
        {/* Header section */}
        <div className="flex items-start justify-between mb-6">
          {/* Chapter number and status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl text-lg font-bold bg-gradient-to-br from-orange-400 to-orange-600/10 text-white">
              {id + 1}
            </div>

            {/* Status indicators */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-green-600">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            </div>
          </div>

          <PrimaryButton className="h-20 text-4xl">PLAY</PrimaryButton>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold leading-tight text-gray-900">
            {title}
          </h3>

          <p className="text-base leading-relaxed text-gray-600">
            {description}
          </p>
        </div>

        <div className="flex items-center flex-wrap mt-4">
          {Array.from({ length: levels }).map((_, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <div className="w-4 h-1 bg-gray-700/10 mt-1.5" />
              )}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-medium mt-2">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
