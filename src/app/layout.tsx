import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";
import PWAInstaller from "@/components/PWAInstaller";
import InstallPrompt from "@/components/InstallPrompt";
import NetworkStatus from "@/components/NetworkStatus";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Sayantan Kar - Full Stack Developer Portfolio",
    template: "%s | Sayantan Kar",
  },
  description: "Portfolio of Sayantan Kar - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: ["developer", "portfolio", "full stack", "react", "next.js", "node.js", "typescript"],
  authors: [{ name: "Sayantan Kar" }],
  applicationName: "Sayantan Kar",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Sayantan Kar",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" }],
    shortcut: [{ url: "/icons/icon.svg" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Sayantan Kar - Full Stack Developer",
    description: "Full Stack Developer crafting beautiful digital experiences.",
    siteName: "Sayantan Kar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayantan Kar - Full Stack Developer",
    description: "Full Stack Developer crafting beautiful digital experiences.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          <Preloader />
          <ScrollProgress />
          <NetworkStatus />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BackToTop />
          <InstallPrompt />
          <PWAInstaller />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1f2937",
                color: "#f9fafb",
                borderRadius: "12px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
