import { CalorieInput, CalorieResult, BMICategory } from '@/types/calculator';
import { ACTIVITY_LEVELS, BMI_RANGES } from './constants';

/**
 * BMI (체질량지수) 계산
 * BMI = 체중(kg) / (키(m))²
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

/**
 * BMI 카테고리 분류
 */
export function getBMICategory(bmi: number): BMICategory {
  if (bmi < BMI_RANGES.underweight.max) {
    return 'underweight';
  } else if (bmi < BMI_RANGES.normal.max) {
    return 'normal';
  } else if (bmi < BMI_RANGES.overweight.max) {
    return 'overweight';
  } else {
    return 'obese';
  }
}

/**
 * 적정 체중 범위 계산
 * 정상 BMI(18.5~23) 기준
 */
export function calculateIdealWeightRange(height: number): { min: number; max: number } {
  const heightInMeters = height / 100;
  const heightSquared = heightInMeters * heightInMeters;
  
  return {
    min: Math.round(BMI_RANGES.normal.min * heightSquared * 10) / 10,
    max: Math.round(BMI_RANGES.normal.max * heightSquared * 10) / 10
  };
}

/**
 * 기초대사량(BMR) 계산 - Harris-Benedict 개정 공식
 */
export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    // 남성: BMR = 88.362 + (13.397 × 체중kg) + (4.799 × 키cm) - (5.677 × 나이)
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    // 여성: BMR = 447.593 + (9.247 × 체중kg) + (3.098 × 키cm) - (4.330 × 나이)
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}

/**
 * 활동 칼로리(TDEE) 계산
 * TDEE = BMR × 활동계수
 */
export function calculateTDEE(bmr: number, activityLevel: CalorieInput['activityLevel']): number {
  const activityFactor = ACTIVITY_LEVELS[activityLevel].factor;
  return bmr * activityFactor;
}

/**
 * 전체 계산 수행
 */
export function calculateCalories(input: CalorieInput): CalorieResult {
  const { height, weight, age, gender, activityLevel } = input;
  
  // BMI 계산
  const bmi = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmi);
  
  // 적정 체중 범위
  const idealWeightRange = calculateIdealWeightRange(height);
  
  // 칼로리 계산
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    idealWeightRange,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calorieGoals: {
      weightLoss: Math.round(tdee - 500),
      maintenance: Math.round(tdee),
      weightGain: Math.round(tdee + 500)
    }
  };
}

