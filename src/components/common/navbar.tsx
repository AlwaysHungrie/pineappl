"use client";

import Link from "next/link";
import { useState } from "react";
import { Chapter } from "../chapters/chapterItem";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useLevel } from "@/contexts/levelContext";

export default function Navbar({
  chapter,
  sectionId,
  currentLevel,
}: {
  chapter?: Chapter;
  sectionId?: string;
  currentLevel?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { completedLevels } = useLevel();

  const handleLevelClick = (levelIndex: number) => {
    // Navigate to the specific level
    if (sectionId && chapter) {
      window.location.href = `/chapters/${sectionId}/${chapter.chapterId}/${levelIndex}`;
    }
  };

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white"
      style={{
        boxShadow:
          "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
      }}
    >
      <div className="flex w-full mx-auto h-16 items-center px-4">
        <Link
          href="/"
          className="flex items-center font-anton font-bold h-full hover:opacity-80 transition-opacity"
        >
          <div className="text-3xl md:text-4xl text-gray-900">Pineappl</div>
          <div className="ml-1 h-full flex flex-col justify-center">
            <div
              className="text-base text-gray-500 font-sans font-normal"
              style={{
                transform: "rotate(-10deg)",
              }}
            >
              for
            </div>

            <div className="text-lg md:text-xl -mt-1">Myra</div>
          </div>
        </Link>
        {chapter && (
          <div className="flex items-center gap-2 ml-auto">
            <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-800 transition-colors cursor-pointer md:text-lg"
                >
                  Menu
                </Button>
              </DrawerTrigger>
              <DrawerContent
                className="max-w-lg md:max-w-sm p-4"
                style={{
                  width: "90%",
                }}
              >
                <div className="mx-auto w-full flex flex-col h-full">
                  <DrawerHeader>
                    <DrawerClose asChild>
                      <Button className="cursor-pointer mb-4" variant="outline">
                        Close Menu
                      </Button>
                    </DrawerClose>

                    <DrawerTitle className="text-2xl font-anton">
                      {chapter.title}
                    </DrawerTitle>
                    <DrawerDescription className="text-gray-600">
                      Select a level to play
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: chapter.levels }).map(
                        (_, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className={`w-12 h-12 rounded-full font-anton text-lg hover:bg-orange-100 hover:border-orange-300 transition-colors ${
                              currentLevel === index + 1
                                ? "bg-orange-100 border-orange-300"
                                : completedLevels.has(
                                    `${sectionId}/${chapter.chapterId}/${
                                      index + 1
                                    }`
                                  )
                                ? "bg-[#A0D94A]"
                                : "bg-white"
                            }`}
                            onClick={() => handleLevelClick(index + 1)}
                          >
                            {index + 1}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                  <DrawerFooter className="mt-auto">
                    <Button
                      variant="outline"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/chapters" className="justify-start">
                        <ArrowLeft className="mr-1" />
                        <span className="w-full text-center">
                          Back to chapter select
                        </span>
                        <ArrowLeft className="mr-1 opacity-0" />
                      </Link>
                    </Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        )}
      </div>
    </header>
  );
}
