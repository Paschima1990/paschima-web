import './globals.css'
import { Inter } from 'next/font/google'
import { Merriweather } from 'next/font/google'
import Navigation from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata = {
  title: 'Paschima Publications — Odia Language Books',
  description: 'Paschima Publications is a leading Odia language book publisher based in Bhubaneswar, Odisha, dedicated to enriching the literary landscape with captivating stories, insightful poetry, engaging essays, and diverse non-fiction works.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans">
        <Navigation />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
