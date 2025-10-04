'use client';

import { useState } from 'react';
import { CalorieInput, CalorieResult } from '@/types/calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AIDiagnosisProps {
  input: CalorieInput;
  result: CalorieResult;
}

export function AIDiagnosis({ input, result }: AIDiagnosisProps) {
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerateDiagnosis() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/health-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height: input.height,
          weight: input.weight,
          age: input.age,
          gender: input.gender,
          bmi: result.bmi,
          bmiCategory: result.bmiCategory,
          bmr: result.bmr,
          tdee: result.tdee,
          idealWeightMin: result.idealWeightRange.min,
          idealWeightMax: result.idealWeightRange.max,
        }),
      });

      if (!response.ok) {
        throw new Error('진단 생성에 실패했습니다.');
      }

      const data = await response.json();
      setDiagnosis(data.diagnosis);
    } catch (err) {
      setError('AI 진단을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          AI 건강 진단
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!diagnosis && !loading && (
          <div className="text-center py-8 space-y-4">
            <p className="text-muted-foreground">
              AI가 당신의 건강 지표를 분석하고 맞춤형 조언을 제공합니다
            </p>
            <Button
              onClick={handleGenerateDiagnosis}
              size="lg"
              className="cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              AI 진단 받기
            </Button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-600" />
            <p className="text-muted-foreground">
              AI가 당신의 건강 상태를 분석하고 있습니다...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 space-y-4">
            <p className="text-red-600">{error}</p>
            <Button
              onClick={handleGenerateDiagnosis}
              variant="outline"
              className="cursor-pointer"
            >
              다시 시도
            </Button>
          </div>
        )}

        {diagnosis && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                className="text-sm leading-relaxed"
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="mb-3 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                  li: ({node, ...props}) => <li className="ml-2" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                  em: ({node, ...props}) => <em className="italic" {...props} />,
                  code: ({node, ...props}) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic my-3" {...props} />,
                }}
              >
                {diagnosis}
              </ReactMarkdown>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                ⚠️ 이 진단은 AI가 제공하는 일반적인 건강 조언이며, 전문 의료인의 진단을 대체할 수 없습니다.
                건강에 문제가 있다면 반드시 전문의와 상담하세요.
              </p>
            </div>

            <Button
              onClick={handleGenerateDiagnosis}
              variant="outline"
              size="sm"
              className="w-full cursor-pointer"
            >
              다시 진단받기
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

