# BMI & 칼로리 계산기 💪📊

건강 관리의 첫 걸음! 키와 몸무게를 입력하면 **BMI**, **적정 체중 범위**, **권장 칼로리**를 계산하고 시각적으로 표시해주는 웹 서비스입니다.

**제작일**: 2025년 10월 4일  
**난이도**: 🟢 Easy  
**제작 시간**: 3-4시간

---

## ✨ 주요 기능

### 📈 BMI 계산
- 체질량지수(BMI) 자동 계산
- 상태 분류: 저체중 / 정상 / 과체중 / 비만
- 반원형 게이지 차트로 시각화
- 색상 코드로 직관적 표시

### ⚖️ 적정 체중 범위
- WHO 아시아-태평양 기준 (BMI 18.5~23)
- 현재 체중 위치 시각화
- 목표 체중까지 증감량 표시

### 🔥 칼로리 계산
- **기초대사량 (BMR)**: Harris-Benedict 공식
- **활동 칼로리 (TDEE)**: 활동량 반영
- **목표별 권장 칼로리**:
  - 체중 감량 (TDEE - 500kcal)
  - 체중 유지 (TDEE)
  - 체중 증량 (TDEE + 500kcal)

### 🤖 AI 건강 진단 (NEW!)
- **Google Gemini AI** 활용
- 개인별 맞춤 건강 조언
- **종합 진단**: 현재 상태 평가
- **식단 조언**: 구체적인 식습관 가이드
- **운동 추천**: 맞춤형 운동 루틴
- **생활 습관**: 실천 가능한 조언

### 🎨 사용자 경험
- 깔끔하고 직관적인 UI
- 반응형 디자인 (모바일 최적화)
- 입력 검증 및 에러 메시지
- 부드러운 전환 애니메이션

---

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **AI**: Google Gemini 2.0 Flash (Experimental)

---

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정 (AI 진단 기능 사용 시)
프로젝트 루트에 `.env.local` 파일 생성:
```env
GOOGLE_AI_API_KEY=your_api_key_here
```

**API Key 발급**: [Google AI Studio](https://makersuite.google.com/app/apikey)

자세한 설정 방법은 [SETUP-AI.md](./SETUP-AI.md)를 참고하세요.

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 프로덕션 빌드
```bash
npm run build
npm start
```

---

## 📁 프로젝트 구조

```
2025-10-04-bmi-calculator/
├── app/
│   ├── api/
│   │   └── health-diagnosis/    # AI 진단 API
│   │       └── route.ts
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 레이아웃 & 메타데이터
│   └── page.tsx             # 메인 페이지
├── components/
│   ├── calculator/
│   │   ├── input-form.tsx       # 입력 폼
│   │   ├── result-display.tsx   # 결과 화면 통합
│   │   ├── bmi-gauge.tsx        # BMI 게이지 차트
│   │   ├── weight-range.tsx     # 체중 범위 바
│   │   ├── calorie-cards.tsx    # 칼로리 카드
│   │   └── ai-diagnosis.tsx     # AI 진단 컴포넌트
│   └── ui/                      # Shadcn UI 컴포넌트
├── lib/
│   ├── ai/
│   │   └── gemini-client.ts # Gemini API 클라이언트
│   ├── calculators.ts       # 계산 로직
│   ├── constants.ts         # 상수 정의
│   └── utils.ts             # 유틸리티
├── types/
│   └── calculator.ts        # TypeScript 타입
├── PLAN.md                  # 상세 기획안
└── SETUP-AI.md              # AI 설정 가이드
```

---

## 📐 계산 공식

### BMI (체질량지수)
```
BMI = 체중(kg) / (키(m))²
```

**분류 기준** (WHO 아시아-태평양):
- 저체중: < 18.5
- 정상: 18.5 ~ 22.9
- 과체중: 23.0 ~ 24.9
- 비만: ≥ 25.0

### 기초대사량 (BMR) - Harris-Benedict 개정 공식
**남성**:
```
BMR = 88.362 + (13.397 × 체중kg) + (4.799 × 키cm) - (5.677 × 나이)
```

**여성**:
```
BMR = 447.593 + (9.247 × 체중kg) + (3.098 × 키cm) - (4.330 × 나이)
```

### 활동 칼로리 (TDEE)
```
TDEE = BMR × 활동계수
```

**활동계수**:
- 거의 운동 안함: 1.2
- 가벼운 활동 (주 1-3회): 1.375
- 보통 활동 (주 3-5회): 1.55
- 활발한 활동 (주 6-7회): 1.725
- 매우 활발한 활동 (하루 2회): 1.9

---

## 🎯 사용 방법

1. **정보 입력**
   - 키 (cm)
   - 몸무게 (kg)
   - 나이 (세)
   - 성별
   - 활동량 (5단계 중 선택)

2. **계산하기 버튼 클릭**
   - 즉시 결과 화면으로 전환

3. **결과 확인**
   - BMI 게이지: 현재 상태 확인
   - 체중 범위: 목표 체중까지 거리
   - 칼로리: 목표별 권장 섭취량

4. **AI 진단 받기** (선택)
   - "AI 진단 받기" 버튼 클릭
   - 맞춤형 건강 조언 확인

5. **다시 계산**
   - "다시 계산하기" 버튼으로 입력 화면 복귀

---

## 🚀 향후 개선 사항

- [x] ~~AI 건강 진단~~ ✅ 완료!
- [ ] 측정 기록 저장 (로컬 스토리지)
- [ ] 시간별 체중 변화 그래프
- [ ] 단위 전환 (kg ↔ lb, cm ↔ ft)
- [ ] 결과 이미지 다운로드
- [ ] 다국어 지원 (영어)
- [ ] 다크모드
- [ ] AI 진단 히스토리 저장
- [ ] PDF 리포트 생성

---

## 📝 참고 자료

- [WHO BMI 분류](https://www.who.int/health-topics/obesity)
- [Harris-Benedict Equation](https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation)
- 대한비만학회 기준

---

## 📄 라이선스

MIT License

---

## 👨‍💻 1일 1서비스 프로젝트

이 프로젝트는 "1일 1서비스" 시리즈의 일부입니다.

**Day 4**: BMI & 칼로리 계산기

이전 프로젝트:
- Day 1: 로고 생성기
- Day 2: 컬러 팔레트 생성기
- Day 3: 오늘의 타로

---

**건강한 삶을 위한 첫 걸음!** 💪

Made with ❤️ using Next.js & TypeScript
