'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeightRangeProps {
  currentWeight: number;
  minWeight: number;
  maxWeight: number;
}

export function WeightRange({ currentWeight, minWeight, maxWeight }: WeightRangeProps) {
  // 현재 체중의 위치를 퍼센트로 계산
  const range = maxWeight - minWeight;
  const position = ((currentWeight - minWeight) / range) * 100;
  const clampedPosition = Math.max(0, Math.min(100, position));

  // 상태 판단
  const isUnder = currentWeight < minWeight;
  const isOver = currentWeight > maxWeight;
  const isIdeal = !isUnder && !isOver;

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">적정 체중 범위</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 체중 범위 바 */}
        <div className="relative">
          {/* 배경 바 */}
          <div className="h-14 bg-gradient-to-r from-blue-50 via-green-50 to-blue-50 rounded-full relative overflow-visible border-2 border-gray-100">
            {/* 정상 범위 강조 */}
            <div className="absolute inset-0 bg-green-100 opacity-40 rounded-full" />
            
            {/* 현재 위치 마커 */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-out"
              style={{ left: `${clampedPosition}%` }}
            >
              <div className={`w-7 h-7 rounded-full border-[3px] ${
                isIdeal ? 'bg-green-500 border-white' :
                isUnder ? 'bg-blue-500 border-white' :
                'bg-orange-500 border-white'
              } shadow-xl`} />
              
              {/* 현재 체중 표시 */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className={`text-base font-bold ${
                  isIdeal ? 'text-green-600' :
                  isUnder ? 'text-blue-600' :
                  'text-orange-600'
                }`}>
                  {currentWeight}kg
                </div>
                <div className="text-xs text-muted-foreground font-medium">현재</div>
              </div>
            </div>
          </div>

          {/* 최소/최대 라벨 */}
          <div className="flex justify-between mt-20 text-sm">
            <div className="text-left">
              <div className="font-bold text-base">{minWeight}kg</div>
              <div className="text-xs text-muted-foreground font-medium">최소</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-base">{maxWeight}kg</div>
              <div className="text-xs text-muted-foreground font-medium">최대</div>
            </div>
          </div>
        </div>

        {/* 상태 메시지 */}
        <div className={`text-center p-4 rounded-xl border ${
          isIdeal ? 'bg-green-50/50 text-green-700 border-green-200' :
          isUnder ? 'bg-blue-50/50 text-blue-700 border-blue-200' :
          'bg-orange-50/50 text-orange-700 border-orange-200'
        }`}>
          {isIdeal && (
            <p className="text-sm font-semibold">
              정상 체중 범위 내에 있습니다
            </p>
          )}
          {isUnder && (
            <p className="text-sm font-semibold">
              적정 체중보다 {(minWeight - currentWeight).toFixed(1)}kg 부족합니다
            </p>
          )}
          {isOver && (
            <p className="text-sm font-semibold">
              적정 체중보다 {(currentWeight - maxWeight).toFixed(1)}kg 초과합니다
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

