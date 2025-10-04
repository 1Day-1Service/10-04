# BMI & 칼로리 계산기 📊

## 프로젝트 개요
건강 관리의 첫 걸음! 키와 몸무게를 입력하면 BMI, 적정 체중 범위, 권장 칼로리를 계산하고 시각적으로 표시해주는 서비스

**제작 날짜**: 2025-10-04  
**난이도**: 🟢 Easy  
**예상 소요시간**: 3-4시간

---

## 핵심 가치
- 🎯 **즉시성**: 클릭 한 번으로 건강 지표 확인
- 📊 **시각화**: 차트로 현재 상태를 직관적으로 파악
- 💡 **실용성**: BMI + 칼로리 + 체중 범위를 한 번에 제공
- 📱 **접근성**: 반응형 디자인으로 모바일에서도 편리

---

## MVP 핵심 기능

### ✅ Phase 1: 기본 계산 (필수)
1. **입력 폼**
   - 키 (cm)
   - 몸무게 (kg)
   - 나이
   - 성별
   - 활동량 (5단계)

2. **BMI 계산**
   - BMI 수치 계산 (몸무게 / 키² × 10,000)
   - 상태 분류 (저체중/정상/과체중/비만)
   - 색상 코드로 시각화

3. **적정 체중 범위**
   - 정상 BMI(18.5~23) 기준 체중 범위 계산
   - 현재 체중과 비교

4. **권장 칼로리 계산**
   - 기초대사량 (BMR) - Harris-Benedict 공식
   - 활동 칼로리 (TDEE) - 활동량 계수 적용
   - 목표별 칼로리 (감량/유지/증량)

### 📊 Phase 2: 시각화 (필수)
1. **BMI 게이지 차트**
   - 반원형 게이지로 현재 BMI 위치 표시
   - 색상 구간 (파랑/초록/주황/빨강)

2. **칼로리 카드**
   - 기초대사량
   - 활동 칼로리
   - 목표별 칼로리 (3가지)

3. **체중 범위 바**
   - 최소~최대 체중 범위 표시
   - 현재 위치 마커

### 🎨 Phase 3: UX 개선 (선택)
- 단위 전환 (kg ↔ lb, cm ↔ ft)
- 입력값 로컬 스토리지 저장
- 결과 이미지 다운로드

---

## 화면 구성

### 1. 메인 화면 (입력 전)
```
┌─────────────────────────────────────┐
│     BMI & 칼로리 계산기 💪          │
│  건강한 삶의 시작, 지금 확인하세요   │
├─────────────────────────────────────┤
│                                      │
│  [입력 폼 카드]                       │
│   • 키 (cm): [____]                 │
│   • 몸무게 (kg): [____]             │
│   • 나이: [____]                    │
│   • 성별: (○남성 ○여성)             │
│   • 활동량: [드롭다운]               │
│                                      │
│       [계산하기 버튼]                 │
│                                      │
└─────────────────────────────────────┘
```

### 2. 결과 화면 (입력 후)
```
┌─────────────────────────────────────┐
│     당신의 건강 지표 📊              │
├─────────────────────────────────────┤
│                                      │
│  [BMI 카드]                          │
│   ┌───────────────────┐             │
│   │   반원형 게이지    │             │
│   │      BMI: 22.5     │             │
│   │      정상 체중     │             │
│   └───────────────────┘             │
│                                      │
│  [적정 체중 범위]                     │
│   46kg ━━━●━━━ 62kg                 │
│        현재: 55kg                    │
│                                      │
│  [권장 칼로리]                        │
│   ┌──────┐ ┌──────┐ ┌──────┐       │
│   │ 감량 │ │ 유지 │ │ 증량 │       │
│   │1,500│ │1,800│ │2,100│       │
│   └──────┘ └──────┘ └──────┘       │
│                                      │
│  [기초대사량: 1,450 kcal]            │
│  [활동 칼로리: 1,800 kcal]           │
│                                      │
│       [다시 계산하기]                 │
│                                      │
└─────────────────────────────────────┘
```

---

## 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
  - Button, Card, Input, Label, Select
  - RadioGroup, Tabs
- **Icons**: Lucide React

### 계산 로직
- BMI 공식
- Harris-Benedict 공식 (BMR)
- Mifflin-St Jeor 공식 (대체)
- 활동 칼로리 계수

### 차트 (선택)
- Recharts (간단한 차트)
- 또는 CSS/SVG로 직접 구현

---

## 데이터 구조

### CalorieInput (입력 데이터)
```typescript
interface CalorieInput {
  height: number;        // cm
  weight: number;        // kg
  age: number;          // 세
  gender: 'male' | 'female';
  activityLevel: ActivityLevel;
}

type ActivityLevel = 
  | 'sedentary'       // 1.2 - 거의 운동 안함
  | 'light'           // 1.375 - 가벼운 운동 (주 1-3회)
  | 'moderate'        // 1.55 - 보통 운동 (주 3-5회)
  | 'active'          // 1.725 - 적극적 운동 (주 6-7회)
  | 'very_active';    // 1.9 - 매우 적극적 (하루 2회)
```

### CalorieResult (결과 데이터)
```typescript
interface CalorieResult {
  // BMI 관련
  bmi: number;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
  
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
```

---

## 계산 공식

### 1. BMI (체질량지수)
```
BMI = 체중(kg) / (키(m))²
```

**분류 기준 (WHO 아시아-태평양 기준)**
- < 18.5: 저체중
- 18.5 ~ 22.9: 정상
- 23.0 ~ 24.9: 과체중
- ≥ 25.0: 비만

### 2. 기초대사량 (BMR) - Harris-Benedict 개정 공식
**남성**:
```
BMR = 88.362 + (13.397 × 체중kg) + (4.799 × 키cm) - (5.677 × 나이)
```

**여성**:
```
BMR = 447.593 + (9.247 × 체중kg) + (3.098 × 키cm) - (4.330 × 나이)
```

### 3. 활동 칼로리 (TDEE)
```
TDEE = BMR × 활동계수
```

**활동계수**:
- 거의 운동 안함: 1.2
- 가벼운 운동 (주 1-3회): 1.375
- 보통 운동 (주 3-5회): 1.55
- 적극적 운동 (주 6-7회): 1.725
- 매우 적극적 (하루 2회): 1.9

### 4. 적정 체중 범위
```
최소 체중 = 18.5 × (키m)²
최대 체중 = 23.0 × (키m)²
```

---

## 폴더 구조
```
2025-10-04-bmi-calculator/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # 메인 페이지
├── components/
│   ├── calculator/
│   │   ├── input-form.tsx       # 입력 폼
│   │   ├── result-display.tsx   # 결과 전체
│   │   ├── bmi-gauge.tsx        # BMI 게이지
│   │   ├── weight-range.tsx     # 체중 범위 바
│   │   ├── calorie-cards.tsx    # 칼로리 카드들
│   │   └── activity-selector.tsx # 활동량 선택
│   └── ui/                      # Shadcn UI 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── radio-group.tsx
├── lib/
│   ├── calculators.ts           # 계산 로직
│   ├── constants.ts             # 상수 (활동계수 등)
│   └── utils.ts                 # 유틸리티
├── types/
│   └── calculator.ts            # 타입 정의
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── PLAN.md
└── README.md
```

---

## 개발 단계

### Step 1: 프로젝트 셋업 (15분)
- [ ] Next.js 프로젝트 생성
- [ ] Shadcn UI 설치 및 필요한 컴포넌트 추가
- [ ] 타입 정의

### Step 2: 계산 로직 구현 (30분)
- [ ] BMI 계산 함수
- [ ] BMR 계산 함수
- [ ] TDEE 계산 함수
- [ ] 적정 체중 계산 함수
- [ ] 분류 및 카테고리 함수

### Step 3: UI 컴포넌트 개발 (90분)
- [ ] 입력 폼 (input-form.tsx)
- [ ] BMI 게이지 (bmi-gauge.tsx)
- [ ] 체중 범위 바 (weight-range.tsx)
- [ ] 칼로리 카드 (calorie-cards.tsx)
- [ ] 결과 화면 (result-display.tsx)

### Step 4: 메인 페이지 통합 (30분)
- [ ] 상태 관리
- [ ] 입력/결과 화면 전환
- [ ] 반응형 레이아웃

### Step 5: 스타일링 & UX (30분)
- [ ] 색상 및 디자인 시스템
- [ ] 애니메이션 추가
- [ ] 로딩 상태
- [ ] 에러 처리

### Step 6: 최종 테스트 (15분)
- [ ] 다양한 입력값 테스트
- [ ] 모바일 반응형 확인
- [ ] 계산 정확도 검증

---

## 디자인 가이드

### 색상 팔레트
- **Primary**: Indigo (계산 버튼, 강조)
- **BMI 색상**:
  - 저체중: Blue (#3B82F6)
  - 정상: Green (#10B981)
  - 과체중: Orange (#F59E0B)
  - 비만: Red (#EF4444)
- **Background**: Gray 50/900 (라이트/다크)
- **카드**: White/Gray 800

### 타이포그래피
- **제목**: text-3xl font-bold
- **BMI 수치**: text-5xl font-extrabold
- **라벨**: text-sm font-medium
- **결과값**: text-2xl font-semibold

### 간격
- **카드 간격**: gap-6
- **내부 패딩**: p-6
- **입력 필드**: space-y-4

---

## 확장 아이디어 (v2)

1. **히스토리 기능**
   - 로컬 스토리지에 측정 기록 저장
   - 시간별 체중/BMI 변화 그래프

2. **다국어 지원**
   - 영어/한국어 전환
   - 단위계 전환 (Imperial/Metric)

3. **운동/식단 추천**
   - BMI 상태별 맞춤 조언
   - 칼로리 소비/섭취 가이드

4. **공유 기능**
   - 결과 이미지 생성 및 다운로드
   - SNS 공유 버튼

5. **다크모드**
   - 시스템 설정 자동 감지

---

## 참고 자료

### 공식 및 기준
- [WHO BMI 분류](https://www.who.int/health-topics/obesity)
- [Harris-Benedict Equation](https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation)
- 대한비만학회 기준

### 디자인 영감
- Health 앱 (iOS)
- Samsung Health
- MyFitnessPal

---

## 성공 기준

✅ **기능 완성도**
- 모든 계산이 정확하게 작동
- 입력 검증 (범위, 필수값)
- 결과가 즉시 표시됨

✅ **사용자 경험**
- 직관적인 UI
- 반응형 디자인
- 부드러운 애니메이션

✅ **코드 품질**
- TypeScript 타입 안정성
- 재사용 가능한 컴포넌트 구조
- 명확한 함수 네이밍

---

**예상 완성 시간**: 3-4시간  
**난이도**: 🟢 Easy (계산 로직은 명확, UI는 중간)  
**확장 가능성**: ⭐⭐⭐⭐ (히스토리, 추천, 공유 등 다양한 기능 추가 가능)

Let's build a healthy future! 💪📊

