import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  weight: "400",
  subsets: ["latin"],
});

const serifDisplay = Source_Serif_4({
  variable: "--font-serif-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Raeen — open-source PS5 emulator for Windows",
    template: "%s · Raeen",
  },
  description:
    "Raeen is a clean-room, open-source PS5 emulator and compatibility layer written in Rust. Native x86-64 execution, AGC-to-Vulkan graphics, no Sony code.",
};

// Applies the saved reality before first paint so themes don't flash.
const themeInit = `try{var t=localStorage.getItem("raeen-reality");if(t&&t!=="lab")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} ${serifDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <div className="backdrop" aria-hidden />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
