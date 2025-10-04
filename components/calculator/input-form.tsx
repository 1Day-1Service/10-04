'use client';

import { useState } from 'react';
import { CalorieInput, ActivityLevel, Gender } from '@/types/calculator';
import { ACTIVITY_LEVELS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calculator } from 'lucide-react';

interface InputFormProps {
  onCalculate: (input: CalorieInput) => void;
}

export function InputForm({ onCalculate }: InputFormProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const ageNum = parseInt(age);

    if (!height || heightNum < 100 || heightNum > 250) {
      newErrors.height = '키는 100~250cm 사이여야 합니다';
    }

    if (!weight || weightNum < 20 || weightNum > 300) {
      newErrors.weight = '몸무게는 20~300kg 사이여야 합니다';
    }

    if (!age || ageNum < 10 || ageNum > 120) {
      newErrors.age = '나이는 10~120세 사이여야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const input: CalorieInput = {
      height: parseFloat(height),
      weight: parseFloat(weight),
      age: parseInt(age),
      gender,
      activityLevel
    };

    onCalculate(input);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-xl">
      <CardHeader className="text-center space-y-3 pb-8">
        <CardTitle className="text-4xl font-bold tracking-tight">
          BMI & 칼로리 계산기
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          당신의 건강 지표를 확인하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 키 */}
          <div className="space-y-2">
            <Label htmlFor="height">키 (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className={errors.height ? 'border-red-500' : ''}
            />
            {errors.height && (
              <p className="text-sm text-red-500">{errors.height}</p>
            )}
          </div>

          {/* 몸무게 */}
          <div className="space-y-2">
            <Label htmlFor="weight">몸무게 (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="65"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={errors.weight ? 'border-red-500' : ''}
            />
            {errors.weight && (
              <p className="text-sm text-red-500">{errors.weight}</p>
            )}
          </div>

          {/* 나이 */}
          <div className="space-y-2">
            <Label htmlFor="age">나이 (세)</Label>
            <Input
              id="age"
              type="number"
              placeholder="30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={errors.age ? 'border-red-500' : ''}
            />
            {errors.age && (
              <p className="text-sm text-red-500">{errors.age}</p>
            )}
          </div>

          {/* 성별 */}
          <div className="space-y-3">
            <Label>성별</Label>
            <RadioGroup
              value={gender}
              onValueChange={(value) => setGender(value as Gender)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="male" id="male" className="cursor-pointer" />
                <Label htmlFor="male" className="cursor-pointer font-normal">
                  남성
                </Label>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="female" id="female" className="cursor-pointer" />
                <Label htmlFor="female" className="cursor-pointer font-normal">
                  여성
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* 활동량 */}
          <div className="space-y-2">
            <Label htmlFor="activity">활동량</Label>
            <Select
              value={activityLevel}
              onValueChange={(value) => setActivityLevel(value as ActivityLevel)}
            >
              <SelectTrigger id="activity" className="cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ACTIVITY_LEVELS).map(([key, { label, description }]) => (
                  <SelectItem key={key} value={key} className="cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-medium">{label}</span>
                      <span className="text-xs text-muted-foreground">{description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 계산 버튼 */}
          <Button 
            type="submit" 
            className="w-full mt-2 h-12 text-base font-semibold transition-all hover:shadow-lg cursor-pointer" 
            size="lg"
          >
            <Calculator className="mr-2 h-5 w-5" />
            계산하기
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

