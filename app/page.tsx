import { getBestsellers } from '../lib/getBestsellers'
import { HeroSection } from '@/components/HeroSection'
import { StatsSection } from '@/components/StatsSection'
import { CategoriesSection } from '@/components/CategoriesSection'
import { BestsellersSection } from '@/components/BestsellersSection'
import { CTASection } from '@/components/CTASection'

export default async function Home() {
  try {
    const bestsellers = await getBestsellers()
    const featuredBook = bestsellers[0] || undefined // Use first bestseller as featured book

    return (
      <main className="min-h-screen bg-white">
        <HeroSection featuredBook={featuredBook} />
        <StatsSection />
        <CategoriesSection />
        <BestsellersSection bestsellers={bestsellers} />
        <CTASection />
      </main>
    )
  } catch (error) {
    console.error('Error rendering homepage:', error)
    // Return a basic page even if there's an error
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4 text-[#0A0A0A]">
            Paschima Publications
          </h1>
          <p className="text-gray-600">
            Welcome to Paschima Publications. Please try again later.
          </p>
        </div>
      </main>
    )
  }
}
