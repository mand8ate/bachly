import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bachly",
  description: "Job searchin in Japan for the next generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={cn(playfair.className, "antialiased h-screen")}>
          <Navbar />
          <main className="">{children}</main>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
