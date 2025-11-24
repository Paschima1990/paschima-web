import { getBestsellers } from '../lib/getBestsellers'
import { HeroSection } from '@/components/HeroSection'
import { StatsSection } from '@/components/StatsSection'
import { CategoriesSection } from '@/components/CategoriesSection'
import { BestsellersSection } from '@/components/BestsellersSection'
import { CTASection } from '@/components/CTASection'

export default async function Home() {
  const bestsellers = await getBestsellers()
  const featuredBook = bestsellers[0] // Use first bestseller as featured book

  return (
    <main className="min-h-screen bg-white">
      <HeroSection featuredBook={featuredBook} />
      <StatsSection />
      <CategoriesSection />
      <BestsellersSection bestsellers={bestsellers} />
      <CTASection />
    </main>
  )
}
