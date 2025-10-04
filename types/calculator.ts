export type ActivityLevel =
  | 'sedentary'      // 1.2 - 거의 운동 안함
  | 'light'          // 1.375 - 가벼운 운동 (주 1-3회)
  | 'moderate'       // 1.55 - 보통 운동 (주 3-5회)
  | 'active'         // 1.725 - 적극적 운동 (주 6-7회)
  | 'very_active';   // 1.9 - 매우 적극적 (하루 2회)

export type Gender = 'male' | 'female';

export type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

export interface CalorieInput {
  height: number;        // cm
  weight: number;        // kg
  age: number;          // 세
  gender: Gender;
  activityLevel: ActivityLevel;
}

export interface CalorieResult {
  // BMI 관련
  bmi: number;
  bmiCategory: BMICategory;
  
  // 적정 체중
  idealWeightRange: {
    min: number;
    max: number;
  };
  
  // 칼로리 관련
  bmr: number;              // 기초대사량
  tdee: number;             // 총 에너지 소비량
  calorieGoals: {
    weightLoss: number;     // 감량 (TDEE - 500)
    maintenance: number;    // 유지 (TDEE)
    weightGain: number;     // 증량 (TDEE + 500)
  };
}

