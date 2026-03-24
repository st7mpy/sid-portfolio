import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Siddharth Singh",
  description:
    "Operator at the intersection of venture research, DeFi, and early-stage startup execution.",
  openGraph: {
    title: "Siddharth Singh",
    description:
      "Operator at the intersection of venture research, DeFi, and early-stage startup execution.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${courierPrime.variable} h-full antialiased`}>
      <body className="noise min-h-full flex flex-col">{children}</body>
    </html>
  );
}
