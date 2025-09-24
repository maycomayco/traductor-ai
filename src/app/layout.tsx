import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TraductorAI",
  description: "AI powered translator",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50`}
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}

            <footer className="border-t py-4">
              <div className="container mx-auto px-4">
                <p className="text-sm text-center text-muted-foreground font-medium">
                  TraductorAI
                </p>
              </div>
            </footer>
          </div>

          <Toaster richColors visibleToasts={1} />
        </body>
      </html>
    </ClerkProvider>
  )
}
