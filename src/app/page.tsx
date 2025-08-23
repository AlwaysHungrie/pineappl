"use client";

import PrimaryButton from "@/components/common/primaryCta";
import Girl from "@/components/girl";
import Pineapple from "@/components/pineapple";
import { Fragment } from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 min-h-screen bg-brand-bg">
      {/* banner */}
      <div className="flex flex-col gap-2 items-center justify-center mt-10 font-anton">
        <div className="text-6xl md:text-8xl font-bold">Pineappl</div>
        <div className="flex gap-2 font-bold text-3xl md:text-5xl items-center">
          <span className="text-xl md:text-2xl">for</span>
          Myra
        </div>
      </div>

      {/* purchase */}
      <div className="absolute top-4 right-4 m-2 z-10">
        <PrimaryButton className="text-lg py-4 px-4" href="/purchase">BUY NOW</PrimaryButton>
      </div>

      {/* content */}
      <div className="py-10 flex-1 flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-2 w-full items-end justify-center">
          <div className="relative flex items-center justify-center h-[98px] w-[77px]">
            <Girl fixedWidth={77} />
            
          </div>
          <div className="flex w-[37px] h-[63px]">
          <Pineapple width={37} />
          </div>
        </div>

        <div className="text-center text-base sm:text-2xl">
          It looks like Myra is hungry.
          <br />
          Let's find some pineapples for her!
        </div>

        <PrimaryButton href="/chapters">Let's go!</PrimaryButton>
      </div>

      {/* footer */}
      <div className="flex flex-col justify-center items-center py-4 text-center">
        <div className="font-medium text-2xl">pineappl.xyz</div>
        <div className="mt-1">
          An introduction to programming in the modern, post-AI world.
        </div>

        <div className="flex gap-2 mt-4 text-gray-500 items-baseline">
          {[
            { label: "Contribute", href: "https://github.com/AlwaysHungrie/pineappl" },
            { label: "Terms of use", href: "/terms-of-use" },
          ].map((item, index) => (
            <Fragment key={item.label}>
              {index > 0 && <span>|</span>}
              <a
                href={item.href}
                key={item.label}
                className="hover:text-gray-700 text-sm"
                target="_blank"
              >
                {item.label}
              </a>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
