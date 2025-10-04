'use client';

import { CalorieResult } from '@/types/calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Activity, TrendingDown, Minus, TrendingUp } from 'lucide-react';

interface CalorieCardsProps {
  result: CalorieResult;
}

export function CalorieCards({ result }: CalorieCardsProps) {
  const { bmr, tdee, calorieGoals } = result;

  const goalCards = [
    {
      title: '체중 감량',
      calories: calorieGoals.weightLoss,
      icon: TrendingDown,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: '하루 -500kcal'
    },
    {
      title: '체중 유지',
      calories: calorieGoals.maintenance,
      icon: Minus,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: '현재 유지'
    },
    {
      title: '체중 증량',
      calories: calorieGoals.weightGain,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: '하루 +500kcal'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 기초 대사량 & 활동 칼로리 */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-xl">
                <Flame className="h-7 w-7 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">기초대사량</p>
                <p className="text-3xl font-bold tracking-tight">{bmr.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">kcal/일</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <Activity className="h-7 w-7 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">활동 칼로리</p>
                <p className="text-3xl font-bold tracking-tight">{tdee.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">kcal/일</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 목표별 권장 칼로리 */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">목표별 권장 칼로리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {goalCards.map((goal) => (
              <div
                key={goal.title}
                className={`${goal.bgColor} rounded-xl p-5 space-y-3 hover:scale-105 transition-transform duration-200 cursor-default border border-gray-100`}
              >
                <div className="flex items-center gap-2">
                  <goal.icon className={`h-5 w-5 ${goal.color}`} />
                  <h3 className="font-bold text-base">{goal.title}</h3>
                </div>
                <div>
                  <p className={`text-4xl font-bold tracking-tight ${goal.color}`}>
                    {goal.calories.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium mt-1">kcal/일</p>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{goal.description}</p>
              </div>
            ))}
          </div>

          {/* 안내 메시지 */}
          <div className="mt-6 p-5 bg-gray-50/50 rounded-xl border border-gray-200">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">참고:</strong> 건강한 체중 감량은 주당 0.5~1kg, 증량은 주당 0.25~0.5kg을 권장합니다.
              급격한 체중 변화는 건강에 해로울 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

