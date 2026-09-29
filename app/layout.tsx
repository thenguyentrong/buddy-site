import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heybuddy-watch.vercel.app"),
  title: "Buddy: the AI gadget you already own",
  description:
    "Buddy turns your smartwatch into a private AI agent. Say what you need, and your phone does it, on your own ChatGPT plan.",
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
