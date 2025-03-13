import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/sonner-theme"
import CookieConsent from "@/components/cookie-consent"
import { PWAInstaller } from "./pwa"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Let's Stream",
  description: "A feature-rich streaming platform for movies and series",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Let's Stream",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lets-stream.vercel.app",
    title: "Let's Stream",
    description: "A feature-rich streaming platform for movies and series",
    siteName: "Let's Stream",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster richColors closeButton position="top-right" />
            <CookieConsent />
            <PWAInstaller />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

