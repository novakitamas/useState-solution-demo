"use client";

import { useState } from "react";

import IncrementButton from "@/app/IncrementButton";

let count1: number = 0;
function incrementCount1() {
  count1++;
}

export default function HomePage() {
  const [count2, setCount2] = useState<number>(0); // array destrukturálás
  const [count3, setCount3] = useState<number>(0);

  // --- Konstans adatok ---
// Ezek NEM állapotok, mert soha nem változnak. A komponens FÖLÖTT vannak,
// így nem keletkeznek újra minden rendereléskor.
type SizeItem = {
  id: string;
  label: string;
  price: number;
};

const SIZES: SizeItem[] = [
  { id: "kicsi", label: "Kicsi (24 cm)", price: 1800 },
  { id: "kozepes", label: "Közepes (32 cm)", price: 2400 },
  { id: "nagy", label: "Nagy (45 cm)", price: 3200 },
];

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="space-y-4 rounded-xl bg-white p-4 text-center shadow-xl">
        <h1 className="text-5xl font-semibold">useState - demo alkalmazás</h1>
        <p className="text-3xl font-bold text-red-400">count1: {count1}</p>
        <p className="text-3xl font-bold text-red-400">count2: {count2}</p>
        <p className="text-3xl font-bold text-red-400">count3: {count3}</p>
        <div className="space-x-3">
          <button className="btn btn-primary" onClick={incrementCount1}>
            count1 növelése
          </button>
          <button className="btn btn-primary" onClick={() => setCount2(count1 + 1)}>
            count2 növelése
          </button>
          <button className="btn btn-primary" onClick={() => setCount2((p) => p + 1)}>
            count2 növelése
          </button>
          <IncrementButton onIncrement={() => setCount3(count3 + 1)}></IncrementButton>
        </div>
      </div>
    </main>
  );
}
