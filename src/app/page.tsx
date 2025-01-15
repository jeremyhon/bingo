import { useEffect } from "react";
import BingoBoard from "../components/BingoBoard";

export default function Home() {
  return (
    <main className="bg-gray-50 py-8 min-h-screen w-full">
      <BingoBoard />
    </main>
  );
}
