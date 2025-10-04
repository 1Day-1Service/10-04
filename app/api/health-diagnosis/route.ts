import { NextRequest, NextResponse } from 'next/server';
import { generateHealthDiagnosis } from '@/lib/ai/gemini-client';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // 입력 검증
    if (!data.height || !data.weight || !data.age || !data.gender) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // AI 진단 생성
    const diagnosis = await generateHealthDiagnosis(data);

    return NextResponse.json({ diagnosis });
  } catch (error) {
    console.error('Health diagnosis error:', error);
    return NextResponse.json(
      { error: 'AI 진단 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

