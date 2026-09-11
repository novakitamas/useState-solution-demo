"use client";

import { useState } from "react";

export default function HomePage() {
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

  const [name, setName] = useState<string>(""); // array destrukturálás
  const [selectedSizeId, setSelectedSizeId] = useState<string>("nagy");

  let greeting = "Kérlek, add meg a neved!";
  if (name) {
    greeting = `Kedves ${name}, állítsd össze a pizzádat!`;
  }

  return (
    <main className="flex min-h-screen justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl space-y-6 self-start rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <header className="text-center">
          <h1 className="flex items-center justify-center gap-2 text-3xl font-bold sm:text-4xl">
            <svg
              aria-hidden="true"
              className="lucide lucide-pizza h-8 w-8 text-orange-600 sm:h-9 sm:w-9"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m12 14-1 1"></path>
              <path d="m13.75 18.25-1.25 1.42"></path>
              <path d="M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12"></path>
              <path d="M18.8 9.3a1 1 0 0 0 2.1 7.7"></path>
              <path d="M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z"></path>
            </svg>
            St.Stephen's 7 Pizza
          </h1>
          <p className="mt-1 text-gray-500">{greeting}</p>
        </header>
        <section>
          <label className="mb-2 block font-semibold" htmlFor="name">
            Vendég neve
          </label>
          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-orange-500"
            id="name"
            placeholder="Pl. Kovács Anna"
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </section>
        <section>
          <h2 className="mb-2 font-semibold">Méret</h2>

          <div className="grid grid-cols-3 gap-3">
            {SIZES.map((size) => {
              const isSelected = selectedSizeId === size.id;
              return (
                <button
                  className={`flex flex-col items-center justify-center rounded-xl border px-2 py-3 transition-all ${
                    isSelected
                      ? "border-orange-500 bg-orange-50/50 font-medium text-orange-600"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedSizeId(size.id)}
                >
                  <span
                    className={`text-sm ${isSelected ? "font-semibold text-amber-800" : "text-gray-800"}`}
                  >
                    {size.label}
                  </span>
                  <span className={`text-sm ${isSelected ? "text-amber-800/80" : "text-gray-400"}`}>
                    {size.price} Ft
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* <h1 className="text-5xl font-semibold">useState - demo alkalmazás</h1>
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
        </div> */}
      </div>
    </main>
  );
}
