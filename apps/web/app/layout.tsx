import { Geist, Geist_Mono } from "next/font/google";

import { ImpersonationIndicator } from "@/components/impersonation-indicator";
import QueryProvider from "@/components/providers/query-provider";
import "@workspace/ui/globals.css";

import { ThemeProviders } from "@/components/providers/theme-providers";
import { Toaster } from "@workspace/ui/components/sonner";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <QueryProvider>
          <ThemeProviders>
            {children}
            <Toaster />
            <ImpersonationIndicator />
          </ThemeProviders>
        </QueryProvider>
      </body>
    </html>
  );
}
