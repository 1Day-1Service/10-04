'use client';

import { CalorieInput, CalorieResult } from '@/types/calculator';
import { Button } from '@/components/ui/button';
import { BMIGauge } from './bmi-gauge';
import { WeightRange } from './weight-range';
import { CalorieCards } from './calorie-cards';
import { ArrowLeft } from 'lucide-react';

interface ResultDisplayProps {
  input: CalorieInput;
  result: CalorieResult;
  onReset: () => void;
}

export function ResultDisplay({ input, result, onReset }: ResultDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">건강 지표</h1>
        <p className="text-muted-foreground text-base">
          키 {input.height}cm · 체중 {input.weight}kg
        </p>
      </div>

      {/* BMI 게이지 */}
      <BMIGauge bmi={result.bmi} category={result.bmiCategory} />

      {/* 체중 범위 */}
      <WeightRange
        currentWeight={input.weight}
        minWeight={result.idealWeightRange.min}
        maxWeight={result.idealWeightRange.max}
      />

      {/* 칼로리 카드 */}
      <CalorieCards result={result} />

      {/* 다시 계산 버튼 */}
      <div className="flex justify-center pt-4">
        <Button 
          onClick={onReset} 
          variant="outline" 
          size="lg"
          className="cursor-pointer hover:bg-accent transition-all"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          다시 계산하기
        </Button>
      </div>
    </div>
  );
}

