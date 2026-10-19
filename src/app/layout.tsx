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
    <html
      lang="en"
      data-theme="dark"
      className={`${courierPrime.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply saved theme before first paint so there's no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme")==="cobalt"?"cobalt":"dark",e=document.documentElement;e.dataset.theme=t;e.classList.toggle("dark",t==="dark")}catch(_){}`,
          }}
        />
      </head>
      <body className="noise min-h-full flex flex-col">{children}</body>
    </html>
  );
}
