# AI 진단 기능 설정 가이드

BMI 계산기에 AI 건강 진단 기능이 추가되었습니다! 🤖

## 📋 기능 소개

Google Gemini AI를 활용하여 다음과 같은 맞춤형 건강 조언을 제공합니다:

1. **종합 진단** - 현재 건강 상태 평가
2. **식단 조언** - 권장 식습관과 피해야 할 음식
3. **운동 추천** - 상태에 맞는 운동 종류와 강도
4. **생활 습관** - 수면, 스트레스 관리 등 실천 가능한 조언

---

## 🔑 API Key 발급 방법

### 1. Google AI Studio 접속
[https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### 2. API Key 생성
- "Create API Key" 버튼 클릭
- 기존 프로젝트 선택 또는 새 프로젝트 생성
- API Key 복사

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음을 추가:

```env
GOOGLE_AI_API_KEY=your_api_key_here
```

**⚠️ 주의**: `.env.local` 파일은 절대 GitHub에 커밋하지 마세요! (이미 .gitignore에 포함되어 있습니다)

---

## 🚀 사용 방법

### 1. 환경 변수 확인
```bash
# .env.local 파일이 있는지 확인
ls -la
```

### 2. 개발 서버 재시작
```bash
# 기존 서버 중지 (Ctrl+C)
npm run dev
```

### 3. 브라우저에서 테스트
1. BMI 계산 완료
2. 결과 화면 하단의 "AI 건강 진단" 섹션
3. "AI 진단 받기" 버튼 클릭
4. 약 5-10초 후 맞춤형 조언 확인

---

## 📁 추가된 파일

```
2025-10-04-bmi-calculator/
├── lib/ai/
│   └── gemini-client.ts          # Gemini API 클라이언트
├── app/api/
│   └── health-diagnosis/
│       └── route.ts               # API 엔드포인트
├── components/calculator/
│   └── ai-diagnosis.tsx           # AI 진단 UI 컴포넌트
└── .env.local                     # 환경 변수 (직접 생성)
```

---

## 🔧 트러블슈팅

### API Key 오류
```
Error: GOOGLE_AI_API_KEY is not defined
```

**해결 방법**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. API Key가 올바르게 입력되었는지 확인
3. 개발 서버를 재시작

### API 호출 실패
```
AI 진단을 생성하는 중 오류가 발생했습니다
```

**해결 방법**:
1. API Key가 유효한지 확인
2. Google AI Studio에서 API가 활성화되었는지 확인
3. 인터넷 연결 확인

### 느린 응답 속도
- 첫 요청: 5-10초 (Gemini 2.0 Flash - 더 빠름!)
- 이후 요청: 3-7초

---

## 💡 AI 프롬프트 커스터마이징

`lib/ai/gemini-client.ts` 파일의 `prompt` 변수를 수정하여 AI 응답 스타일을 변경할 수 있습니다:

```typescript
const prompt = `당신은 전문 영양사이자 건강 컨설턴트입니다...`;
```

**커스터마이징 예시**:
- 더 친근한 톤 사용
- 특정 식단법 강조 (저탄고지, 비건 등)
- 운동 종류 구체화
- 응답 길이 조절

---

## 📊 API 사용량 & 비용

### Gemini API 무료 할당량
- **무료 티어**: 분당 10 요청, 일일 1,500 요청
- **충분한 사용량**: 개인 프로젝트에 적합

### 사용 중인 모델
현재 사용 중인 `gemini-2.0-flash-exp` 모델:
- **최신 실험 모델**: 더 빠르고 정확한 응답
- **무료**: 실험 기간 동안 무료로 사용 가능
- **향상된 성능**: Gemini 1.5 대비 2배 빠른 속도

자세한 정보: [Google AI Pricing](https://ai.google.dev/pricing)

---

## 🔒 보안 주의사항

### ✅ DO
- `.env.local` 파일에 API Key 저장
- 환경 변수로만 API Key 접근
- `.gitignore`에 `.env*` 포함 확인

### ❌ DON'T
- 코드에 직접 API Key 하드코딩
- GitHub에 API Key 커밋
- 클라이언트 사이드에서 직접 API 호출
- API Key를 공개적으로 공유

---

## 🌟 향후 개선 사항

- [ ] 진단 결과 캐싱 (동일한 입력에 대해)
- [ ] 진단 히스토리 저장
- [ ] 다국어 지원 (영어, 일본어 등)
- [ ] PDF 다운로드 기능
- [ ] 더 상세한 운동 루틴 제공
- [ ] 식단 예시 이미지 생성

---

## 📞 문의

API 설정이나 사용 중 문제가 있으시면 GitHub Issues에 올려주세요!

**Happy Coding!** 🚀💪

