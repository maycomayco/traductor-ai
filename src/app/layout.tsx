import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Barlow, Bebas_Neue, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import { Toaster } from "@/components/ui/sonner"

const bebasNeue = Bebas_Neue({
    weight: "400",
    variable: "--font-bebas",
    subsets: ["latin"],
})

const ibmPlexMono = IBM_Plex_Mono({
    weight: ["400", "700"],
    variable: "--font-mono",
    subsets: ["latin"],
})

const barlow = Barlow({
    weight: ["400", "700", "900"],
    variable: "--font-sans",
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
            <html lang="es">
                <body
                    className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${barlow.variable} antialiased`}
                >
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        {children}

                        <footer className="border-t-2 bg-[#1a1a1a] py-3 px-8 flex items-center justify-between text-white">
                            <span className="font-mono text-[9px] font-bold tracking-[3px] uppercase opacity-30">
                                TraductorAI
                            </span>
                            <span className="font-mono text-[9px] tracking-[1px] opacity-30">
                                powered by OPENAI
                            </span>
                        </footer>
                    </div>

                    <Toaster richColors visibleToasts={1} />
                    <ServiceWorkerRegister />
                </body>
            </html>
        </ClerkProvider>
    )
}
