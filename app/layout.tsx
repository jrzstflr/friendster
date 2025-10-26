import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Friendster - Connect, Share & Discover | Modern Social Network",
  description:
    "Join Friendster, the modern social media platform where you can connect with friends, share moments, discover trending content, and build meaningful relationships.",
  keywords: ["social media", "social network", "connect", "share", "friends", "community"],
  authors: [{ name: "Friendster" }],
  creator: "Friendster",
  publisher: "Friendster",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://friendster.app",
    siteName: "Friendster",
    title: "Friendster - Connect, Share & Discover",
    description: "The modern social media platform for connecting with friends and discovering amazing content.",
    images: [
      {
        url: "https://friendster.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Friendster Social Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Friendster - Connect, Share & Discover",
    description: "Join the modern social media platform",
    creator: "@friendster",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#1a1a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://friendster.app" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
