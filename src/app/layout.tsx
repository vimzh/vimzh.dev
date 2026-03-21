import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import { BottomBlur } from "@/components/BottomBlur";
import { CommandMenu } from "@/components/CommandMenu";
import { ContactDialog } from "@/components/ContactDialog";
import { Footer } from "@/components/Footer";
import { DotGrid } from "@/components/DotGrid";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geistMono.variable,
        "font-mono",
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <DotGrid />
            <Navbar />
            <CommandMenu />
            <ContactDialog />
            <main className="relative z-10 flex-1">{children}</main>
            <Footer />
            <BottomBlur />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
