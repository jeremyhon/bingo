"use client";

import { useEffect, useState } from "react";

interface BingoQuestion {
  text: string;
  color: string;
}

// Sample questions for the bingo board
const BINGO_QUESTIONS: BingoQuestion[] = [
  { text: "What T's family calls her", color: "bg-pink-50" },
  { text: "T's Exchange Country", color: "bg-pink-50" },
  { text: "J's Fav Pokemon", color: "bg-blue-50" },
  { text: "T's Chinese Name", color: "bg-pink-50" },
  { text: "T's CCA Instrument", color: "bg-pink-50" },
  { text: "T's Last Workcation Location", color: "bg-pink-50" },
  { text: "Any video game J has played", color: "bg-blue-50" },
  { text: "Our Honeymoon Destination", color: "bg-purple-50" },
  { text: "J's NOC location", color: "bg-blue-50" },
  { text: "T's Fav Character", color: "bg-pink-50" },
  { text: "J's Birthday", color: "bg-blue-50" },
  { text: "Which year did we first meet", color: "bg-purple-50" },
  { text: "J's Startup Name", color: "bg-white" },
  { text: "When did J propose?", color: "bg-purple-50" },
  { text: "J's Primary School", color: "bg-blue-50" },
  { text: "T's Fav Disney Song", color: "bg-pink-50" },
  { text: "J's Fav drink", color: "bg-blue-50" },
  { text: "One of T's nicknames for J", color: "bg-purple-50" },
  { text: "Where J grew up", color: "bg-blue-50" },
  { text: "T's Fav Disney Princess", color: "bg-pink-50" },
  { text: "Which Minister offended T", color: "bg-pink-50" },
  { text: "T's Love Language", color: "bg-pink-50" },
  { text: "J's Chinese Name", color: "bg-blue-50" },
  { text: "T's Fav Dessert", color: "bg-pink-50" },
  { text: "T's Office Nickname", color: "bg-pink-50" },
];

const BingoBoard = () => {
  const [answers, setAnswers] = useState<string[]>(Array(25).fill(""));

  // Load answers from localStorage on component mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem("bingoAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    console.log("Stop peeking! There are no answers here!");
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bingoAnswers", JSON.stringify(answers));
  }, [answers]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the board? This will clear all your answers."
      )
    ) {
      setAnswers(Array(25).fill(""));
      localStorage.removeItem("bingoAnswers");
    }
  };

  const isPartOfWinningLine = (index: number): boolean => {
    // Check if the cell is empty
    if (!answers[index]) return false;

    const row = Math.floor(index / 5);
    const col = index % 5;

    // Check horizontal line
    if (answers.slice(row * 5, (row + 1) * 5).every((cell) => cell !== "")) {
      return true;
    }

    // Check vertical line
    if ([0, 1, 2, 3, 4].every((r) => answers[r * 5 + col] !== "")) {
      return true;
    }

    // Check diagonal (top-left to bottom-right)
    if (index % 6 === 0) {
      if ([0, 6, 12, 18, 24].every((i) => answers[i] !== "")) {
        return true;
      }
    }

    // Check diagonal (top-right to bottom-left)
    if (index % 4 === 0 && index < 24) {
      if ([4, 8, 12, 16, 20].every((i) => answers[i] !== "")) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="p-2 min-w-[400px]">
      <h1 className="text-2xl font-bold text-center mb-4">
        T &amp; J&apos;s Wedding Bingo
      </h1>
      <ol className="text-xs mb-4 list-decimal pl-5">
        <li>Ask around for answers</li>
        <li>
          Fill in at least two rows of answers. Horizontally, Diagonally or
          Vertically
        </li>
        <li>Come get your answers checked by T or J</li>
        <li>Win fabulous prizes!</li>
      </ol>
      <div className="grid grid-cols-5 gap-2">
        {BINGO_QUESTIONS.map((question, index) => (
          <div
            key={index}
            className={`${
              isPartOfWinningLine(index) ? "bg-yellow-100" : question.color
            } text-center rounded-lg shadow-md p-1 aspect-square flex flex-col text-xs font-medium relative ${
              isPartOfWinningLine(index)
                ? "ring-2 ring-yellow-200 ring-opacity-50 shadow-lg shadow-yellow-100/50"
                : ""
            }`}
          >
            {index === 12 && (
              <div className="absolute inset-0 text-center text-gray-300 font-bold text-lg pointer-events-none">
                FREE SPACE
              </div>
            )}
            <p className="mb-1 flex-grow relative z-10">{question.text}</p>
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="w-full p-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 relative z-10"
              placeholder="Answer..."
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleReset}
        className="mt-8 px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors mx-auto block"
      >
        Reset Board
      </button>
    </div>
  );
};

export default BingoBoard;
