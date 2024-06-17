import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Spotlight } from "@/components/ui/spotlight";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "WhispX - Transcribe audio in minutes",
    description: "Transcribe audio in minutes with WhisperV3 and Flash Attention v2 + Transformers without relying on third-party providers and APIs. Host it yourself or try it out.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <Spotlight className="hidden md:flex md:-top-80 left-80  " fill="white" />
                    {children}
                </ThemeProvider>
            </body>
        </html >
    );
}
