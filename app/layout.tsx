import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heybuddy-watch.vercel.app"),
  title: "Buddy: a private AI agent on the watch you already wear",
  description:
    "Say “Hey Buddy” and it texts, calls and handles your messages on your phone. Runs on your own ChatGPT plan; what's private is read on your phone with on-device AI.",
  openGraph: {
    title: "Buddy",
    description: "A private, hands-free AI agent on the watch you already wear.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
