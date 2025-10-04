'use client';

import { useState } from 'react';
import { CalorieInput, CalorieResult } from '@/types/calculator';
import { calculateCalories } from '@/lib/calculators';
import { InputForm } from '@/components/calculator/input-form';
import { ResultDisplay } from '@/components/calculator/result-display';

export default function HomePage() {
  const [input, setInput] = useState<CalorieInput | null>(null);
  const [result, setResult] = useState<CalorieResult | null>(null);

  function handleCalculate(newInput: CalorieInput) {
    const newResult = calculateCalories(newInput);
    setInput(newInput);
    setResult(newResult);
  }

  function handleReset() {
    setInput(null);
    setResult(null);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 py-12 px-4">
      {result && input ? (
        <ResultDisplay input={input} result={result} onReset={handleReset} />
      ) : (
        <InputForm onCalculate={handleCalculate} />
      )}
    </main>
  );
}
