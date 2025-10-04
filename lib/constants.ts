import { ActivityLevel } from '@/types/calculator';

export const ACTIVITY_LEVELS: Record<ActivityLevel, { label: string; factor: number; description: string }> = {
  sedentary: {
    label: '거의 운동 안함',
    factor: 1.2,
    description: '대부분 앉아있거나 누워있음'
  },
  light: {
    label: '가벼운 활동',
    factor: 1.375,
    description: '주 1-3회 가벼운 운동'
  },
  moderate: {
    label: '보통 활동',
    factor: 1.55,
    description: '주 3-5회 중간 강도 운동'
  },
  active: {
    label: '활발한 활동',
    factor: 1.725,
    description: '주 6-7회 고강도 운동'
  },
  very_active: {
    label: '매우 활발한 활동',
    factor: 1.9,
    description: '하루 2회 이상 고강도 운동'
  }
};

export const BMI_CATEGORIES = {
  underweight: {
    label: '저체중',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description: '체중을 늘리는 것이 좋습니다'
  },
  normal: {
    label: '정상',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    description: '건강한 체중을 유지하고 있습니다'
  },
  overweight: {
    label: '과체중',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    description: '체중 관리가 필요합니다'
  },
  obese: {
    label: '비만',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    description: '적극적인 체중 관리가 필요합니다'
  }
};

// BMI 범위 (WHO 아시아-태평양 기준)
export const BMI_RANGES = {
  underweight: { max: 18.5 },
  normal: { min: 18.5, max: 23.0 },
  overweight: { min: 23.0, max: 25.0 },
  obese: { min: 25.0 }
};

