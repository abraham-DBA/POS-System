import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import MobileSideBar from "./components/MobileSideBar";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MokoPhones - POS System",
  description: "Mobile and phone retail POS system",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#121212] dark:text-white bg-white text-gray-900`}
        >
          <ThemeProvider>
            <div className="flex h-screen overflow-hidden flex-col md:flex-row">
              <div className="hidden md:block">
                <SideBar />
              </div>
              <MobileSideBar />
              <div className="flex flex-col flex-1 overflow-auto">
                <Header />
                <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
