import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import NavBar from '@/components/Layout/NavBar'
import { Nanum_Gothic } from 'next/font/google';

const nanumGothic = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700', '800'], // 필요한 굵기만 선택
  variable: '--font-nanum-gothic', // CSS 변수명으로 Tailwind와 연동 가능
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bubblog",
  description: "글이 대화가 되는 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${nanumGothic.variable} font-nanum antialiased`}
      >
        <AuthProvider>
          <NavBar />
          {children}  
        </AuthProvider>
      </body>
    </html>
  );
}
