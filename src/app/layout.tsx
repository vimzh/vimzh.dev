import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Geist_Mono, JetBrains_Mono } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";

import { BottomBlur } from "@/components/BottomBlur";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

import "./globals.css";

const DotGrid = dynamic(() =>
  import("@/components/DotGrid").then((m) => ({ default: m.DotGrid })),
);
const BotanicalVines = dynamic(() =>
  import("@/components/BotanicalVines").then((m) => ({
    default: m.BotanicalVines,
  })),
);
const CommandMenu = dynamic(() =>
  import("@/components/CommandMenu").then((m) => ({ default: m.CommandMenu })),
);
const ContactDialog = dynamic(() =>
  import("@/components/ContactDialog").then((m) => ({
    default: m.ContactDialog,
  })),
);
const ResumeDialog = dynamic(() =>
  import("@/components/ResumeDialog").then((m) => ({
    default: m.ResumeDialog,
  })),
);

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["200", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: site.themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: site.themeColors.dark },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.roles[0]}`,
    template: `%s | ${site.siteName}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} | ${site.roles.slice(0, 2).join(", ")}`,
    description: site.description,
    url: site.url,
    siteName: site.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.roles[0]}`,
    description: site.description,
    creator: site.twitterHandle,
  },
  verification: {
    google: "xXWQ-aNWmuO7kglRRSgjkAoy_5npCJ1lo_orAAEMKVI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={cn("h-full antialiased", geistMono.variable, jetbrainsMono.variable, "font-mono")}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <DotGrid />
            <BotanicalVines />
            <Navbar />
            <CommandMenu />
            <ContactDialog />
            <ResumeDialog />
            <main className="relative z-10 flex-1">{children}</main>
            <Footer />
            <BottomBlur />
          </TooltipProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
