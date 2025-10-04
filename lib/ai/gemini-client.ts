import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GOOGLE_AI_API_KEY) {
  throw new Error('GOOGLE_AI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export async function generateHealthDiagnosis(data: {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  idealWeightMin: number;
  idealWeightMax: number;
}): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `당신은 전문 영양사이자 건강 컨설턴트입니다. 다음 건강 지표를 분석하고 맞춤형 조언을 제공해주세요.

**사용자 정보:**
- 나이: ${data.age}세
- 성별: ${data.gender === 'male' ? '남성' : '여성'}
- 키: ${data.height}cm
- 체중: ${data.weight}kg

**건강 지표:**
- BMI: ${data.bmi} (${data.bmiCategory})
- 적정 체중 범위: ${data.idealWeightMin}kg ~ ${data.idealWeightMax}kg
- 기초대사량: ${data.bmr} kcal/일
- 활동 칼로리: ${data.tdee} kcal/일

**다음 마크다운 형식으로 답변해주세요:**

## 종합 진단

현재 건강 상태를 객관적으로 평가하고, 주목할 점을 2-3문장으로 작성해주세요.

## 식단 조언

구체적인 식습관 개선 방법을 제시해주세요:

- **권장 음식**: 적극적으로 섭취하면 좋은 음식들
- **피해야 할 음식**: 제한하거나 피해야 할 음식들
- **하루 식사 예시**: 아침/점심/저녁 간단한 구성

## 운동 추천

현재 상태에 맞는 운동을 추천해주세요:

- **유산소 운동**: 종류와 빈도
- **근력 운동**: 추천 운동과 강도
- **주의사항**: 운동 시 주의할 점

## 생활 습관 개선

실천 가능한 생활 습관 조언:

- **수면**: 권장 수면 시간과 팁
- **스트레스 관리**: 실천 방법
- **기타**: 추가 조언

**주의사항:**
- 전문적이면서도 친근한 톤으로 작성
- 실천 가능한 구체적인 조언 제공
- 마크다운 형식 (##, ###, -, **) 사용
- 의학적 진단이 아닌 일반적인 건강 조언임을 명시`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating health diagnosis:', error);
    throw new Error('AI 진단 생성 중 오류가 발생했습니다.');
  }
}

