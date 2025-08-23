"use client";

import { useGame } from "@/contexts/gameContext";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";

export default function InstructionPanel() {
  const { levelData } = useGame();
  const markdownContent = levelData?.instructions;

  const components: Components = useMemo(
    () => ({
      h1: ({ children, ...props }) => (
        <h1
          className="text-xl font-semibold text-gray-700 mt-4 mb-3"
          {...props}
        >
          {children}
        </h1>
      ),
      h2: ({ children, ...props }) => (
        <h2
          className="text-lg font-semibold text-gray-800 mt-3 mb-2"
          {...props}
        >
          {children}
        </h2>
      ),
      
      p: ({ children, ...props }) => (
        <p className="text-base text-gray-700 leading-relaxed mb-4" {...props}>
          {children}
        </p>
      ),
      ul: ({ children, ...props }) => (
        <ul className="list-disc list-inside space-y-px mb-4 ml-4" {...props}>
          {children}
        </ul>
      ),
      ol: ({ children, ...props }) => (
        <ol className="list-decimal list-inside space-y-px mb-4 ml-4" {...props}>
          {children}
        </ol>
      ),
      li: ({ children, ...props }) => (
        <li className="text-base text-gray-700 leading-relaxed" {...props}>
          {children}
        </li>
      ),
      strong: ({ children, ...props }) => (
        <strong className="font-semibold text-gray-900" {...props}>
          {children}
        </strong>
      ),
      em: ({ children, ...props }) => (
        <em className="italic text-gray-600" {...props}>
          {children}
        </em>
      ),
      code: ({ children, ...props }) => (
        <code className="bg-yellow-100 px-2 rounded-xs" {...props}>
          {children}
        </code>
      ),
      hr: ({ ...props }) => (
        <hr className="border-t-2 border-gray-200 mb-4" {...props} />
      ),
    }),
    []
  );

  return (
    <div className="px-4 pb-4">
      <ReactMarkdown components={components}>{markdownContent}</ReactMarkdown>
    </div>
  );
}
