import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './styles/index.scss';
import { AuthContext } from "./AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minix",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthContext>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        {children}

      </body>
      </AuthContext>
       
    </html>
  );
}
