'use client';

import { BMICategory } from '@/types/calculator';
import { BMI_CATEGORIES } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BMIGaugeProps {
  bmi: number;
  category: BMICategory;
}

export function BMIGauge({ bmi, category }: BMIGaugeProps) {
  const categoryInfo = BMI_CATEGORIES[category];
  
  // BMI를 게이지 위치(0-100%)로 변환
  // 15(최소) ~ 35(최대) 범위를 0-100%로 매핑
  const minBMI = 15;
  const maxBMI = 35;
  const percentage = Math.min(100, Math.max(0, ((bmi - minBMI) / (maxBMI - minBMI)) * 100));

  // 각 구간의 색상과 범위
  const sections = [
    { color: '#3B82F6', start: 0, end: 17.5, label: '저체중' },      // 15-18.5
    { color: '#10B981', start: 17.5, end: 40, label: '정상' },      // 18.5-23
    { color: '#F59E0B', start: 40, end: 50, label: '과체중' },      // 23-25
    { color: '#EF4444', start: 50, end: 100, label: '비만' }        // 25+
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">BMI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* BMI 수치 */}
        <div className="text-center">
          <div className="text-7xl font-bold mb-3 tracking-tight">{bmi}</div>
          <div className={`text-2xl font-semibold ${categoryInfo.color}`}>
            {categoryInfo.label}
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            {categoryInfo.description}
          </p>
        </div>

        {/* 반원형 게이지 */}
        <div className="relative w-full aspect-[2/1] flex items-end justify-center">
          {/* 배경 아크 */}
          <svg
            viewBox="0 0 200 100"
            className="w-full h-full"
          >
            {/* 색상 구간들 */}
            {sections.map((section, index) => {
              const startAngle = 180 - (section.start * 1.8);
              const endAngle = 180 - (section.end * 1.8);
              const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
              
              const startX = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
              const startY = 100 - 80 * Math.sin((startAngle * Math.PI) / 180);
              const endX = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
              const endY = 100 - 80 * Math.sin((endAngle * Math.PI) / 180);

              return (
                <path
                  key={index}
                  d={`M ${startX} ${startY} A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY}`}
                  fill="none"
                  stroke={section.color}
                  strokeWidth="16"
                  strokeLinecap="round"
                />
              );
            })}
            
            {/* 현재 위치 표시 마커 */}
            <g>
              <circle
                cx={100 + 80 * Math.cos(((180 - percentage * 1.8) * Math.PI) / 180)}
                cy={100 - 80 * Math.sin(((180 - percentage * 1.8) * Math.PI) / 180)}
                r="8"
                fill="white"
                stroke="#1F2937"
                strokeWidth="3"
              />
            </g>
          </svg>

          {/* 구간 라벨 */}
          <div className="absolute bottom-0 w-full flex justify-between text-xs text-muted-foreground px-4">
            <span>15</span>
            <span className="text-blue-600">18.5</span>
            <span className="text-green-600">23</span>
            <span className="text-orange-600">25</span>
            <span>35+</span>
          </div>
        </div>

        {/* 범례 */}
        <div className="grid grid-cols-4 gap-3 text-xs font-medium">
          {sections.map((section) => (
            <div key={section.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: section.color }}
              />
              <span className="text-muted-foreground">{section.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

