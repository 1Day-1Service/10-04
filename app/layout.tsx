import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BMI & 칼로리 계산기 | 건강 관리의 시작",
  description: "키와 몸무게를 입력하면 BMI, 적정 체중 범위, 권장 칼로리를 계산하고 시각적으로 표시해주는 서비스",
  keywords: ["BMI", "칼로리 계산기", "건강", "다이어트", "체중 관리", "기초대사량"],
  verification: {
    google: "4fH6k9IRd0AGqHAYAvpCe_EN_NwmRCpFso5olHqs_MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
