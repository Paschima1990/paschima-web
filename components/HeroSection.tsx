'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import type { Book } from '@/lib/getBooks'

type Props = {
  featuredBook?: Book
}

export function HeroSection({ featuredBook }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white pt-8 sm:pt-12 md:pt-16 pb-20 sm:pb-32 md:pb-40 px-4 sm:px-6">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs - Responsive sizing */}
        <div className="absolute -top-20 sm:-top-32 md:-top-40 -right-20 sm:-right-32 md:-right-40 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#635BFF]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 sm:-left-32 md:-left-40 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-purple-200/10 rounded-full blur-3xl" />

        {/* Grid Pattern - Smaller on mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:20px_20px] md:bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl lg:max-w-none">
            {/* Badge - Responsive text and padding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#635BFF]/10 rounded-full mb-4 sm:mb-6"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#635BFF] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-[#635BFF]">
                <span className="hidden sm:inline">ଓଡ଼ିଆ ସାହିତ୍ୟର ଅଗ୍ରଣୀ ପ୍ରକାଶକ</span>
                <span className="sm:hidden">ଅଗ୍ରଣୀ ପ୍ରକାଶକ</span>
              </span>
            </motion.div>

            {/* Main Heading with Staggered Animation - Responsive sizing */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-4 sm:mb-6 text-[#0A0A0A] tracking-tight leading-[1.2]"
            >
              <span className="block whitespace-nowrap">
                ପଶ୍ଚିମା{' '}
                <span className="bg-gradient-to-r from-[#0A0A0A] via-[#635BFF] to-[#0A0A0A] bg-clip-text text-transparent">
                  ପବ୍ଲିକେଶନସ୍
                </span>
              </span>
              {/* <span className="block mt-2 sm:mt-3 md:mt-4">ସ୍ୱାଗତ</span> */}
            </motion.h1>

            {/* Description with Fade In - Responsive text sizes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 sm:mb-8 space-y-3 sm:space-y-4"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl">
                ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶାରେ ଅବସ୍ଥିତ ଏକ{' '}
                <strong className="text-[#0A0A0A] font-semibold relative">
                  <span className="relative z-10">ଅଗ୍ରଣୀ ଓଡ଼ିଆ ଭାଷା ପୁସ୍ତକ ପ୍ରକାଶକ</span>
                  <span className="absolute bottom-0 left-0 right-0 h-1.5 sm:h-2 bg-[#635BFF]/20 -z-0" />
                </strong>
                , ଆକର୍ଷଣୀୟ କାହାଣୀ, ଗଭୀର କବିତା, ରୋଚକ ପ୍ରବନ୍ଧ ଏବଂ ବିଭିନ୍ନ ଅଣ-କାଳ୍ପନିକ ରଚନା ସହିତ ସାହିତ୍ୟିକ ପରିବେଶକୁ ସମୃଦ୍ଧ କରିବାରେ ନିୟୋଜିତ।
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl">
                ଆମର ଉଦ୍ଦେଶ୍ୟ ହେଉଛି ପ୍ରତିଭାଶାଳୀ ଲେଖକମାନଙ୍କୁ ସଶକ୍ତ କରିବା ଏବଂ ସେମାନଙ୍କୁ ବିଚିତ୍ର କାହାଣୀ ଏବଂ ଗଭୀର ଅନୁଭବ ଖୋଜୁଥିବା ପାଠକମାନଙ୍କ ସହିତ ସଂଯୋଗ କରିବା।
              </p>
            </motion.div>

            {/* CTA Buttons with Enhanced Styling - Responsive sizing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <Button
                asChild
                size="lg"
                className="group bg-[#635BFF] hover:bg-[#5548E5] text-white text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-7 rounded-lg shadow-lg shadow-[#635BFF]/25 hover:shadow-xl hover:shadow-[#635BFF]/30 transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/book" className="flex items-center justify-center sm:justify-start">
                  <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                  <span className="whitespace-nowrap">ଆମର ସଂଗ୍ରହ ଅନୁସନ୍ଧାନ କରନ୍ତୁ</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#635BFF] hover:text-[#635BFF] text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-7 rounded-lg transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/about" className="text-center sm:text-left">
                  ଆମ ବିଷୟରେ ଅଧିକ ଜାଣନ୍ତୁ
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Side - 3D Book */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:flex justify-center items-center perspective"
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotateY: [0, 8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="book-3d"
                style={{
                  width: '280px',
                  height: '400px',
                  transform: 'rotateY(12deg) rotateX(2deg)',
                }}
              >
                <div className="book-face book-front relative overflow-hidden">
                  <Image
                    src="https://img.playbook.com/jG3DSzPizy4uhB9gNsieGHykJt1ryWaWUaeigBUuScM/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzdmOWNlMzBh/LTdhMmYtNDAzMy1i/NTdjLWEzN2UzYWNm/MjhlOA"
                    alt={featuredBook?.title || 'Featured Book'}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                <div
                  className="book-face book-spine"
                  style={{
                    backgroundColor: featuredBook?.backgroundColor || '#6E665B',
                  }}
                />
                <div className="book-face book-pages" />
              </motion.div>
              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#635BFF]/20 rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.6, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile, shown on larger screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
