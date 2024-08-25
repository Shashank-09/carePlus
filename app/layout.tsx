import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/themes-provider";
import { cn } from "@/lib/utils";

import {
  ClerkProvider,
} from '@clerk/nextjs'
import { dark } from "@clerk/themes";


const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarePluse",
  description: "A helthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
      variables: { 
        colorPrimary: "#3371FF",
        fontSize : "16px",
       },
    }}
    >
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-dark-300 font-sans antialiased ",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
