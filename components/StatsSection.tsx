'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BookOpen, Sparkles } from 'lucide-react'

// Animated number component with roll/scramble effect
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 30
    const stepDuration = duration / steps
    let currentStep = 0
    
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(value * easeOutCubic)
      
      // Add scramble effect - show random numbers during animation
      if (progress < 0.9) {
        // Scramble: show random digits
        const randomOffset = Math.floor(Math.random() * (value * 0.1))
        setDisplayValue(currentValue + randomOffset)
      } else {
        // Final: show actual value
        setDisplayValue(value)
      }
      
      if (currentStep >= steps) {
        setDisplayValue(value)
        clearInterval(interval)
      }
    }, stepDuration)
    
    return () => clearInterval(interval)
  }, [value])
  
  return (
    <span className="inline-block">
      {displayValue.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 lg:gap-16 justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-[#635BFF]/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#635BFF]" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0A0A0A] leading-tight">
                <AnimatedNumber value={1500} suffix="+" />
              </div>
              <div className="text-sm sm:text-base md:text-lg text-gray-700 font-medium mt-1">ପୁସ୍ତକ ସଂଗ୍ରହ</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-600" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0A0A0A] leading-tight">
                <AnimatedNumber value={150} suffix="+" />
              </div>
              <div className="text-sm sm:text-base md:text-lg text-gray-700 font-medium mt-1">ଲେଖକ</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 sm:py-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0A0A0A] leading-tight">
                <AnimatedNumber value={35} suffix="+" />
              </div>
              <div className="text-sm sm:text-base md:text-lg text-gray-700 font-medium mt-1">ବର୍ଷର ଅଭିଜ୍ଞତା</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

