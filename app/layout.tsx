import "./globals.css";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Voxly - Enterprise AI Speech Intelligence Platform",
  description:
    "Voxly transcribes audio in minutes with OpenAI Whisper large-v3 and Flash Attention v2. Host serverless GPU workers on Modal or deploy on-premise with zero data retention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
