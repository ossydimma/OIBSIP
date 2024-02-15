import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const san = Source_Sans_3({ weight: '700', subsets: ['latin'] });

export const metadata: Metadata = {
  title: "TRIBUTE PAGE",
  description: "Tribute page of Martin Luther",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={san.className}>{children}</body>
    </html>
  );
}
