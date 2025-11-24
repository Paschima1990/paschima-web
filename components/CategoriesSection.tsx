'use client'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { BookOpen, PenTool, FileText, Calendar, MapPin } from 'lucide-react'

const categories = [
  {
    icon: BookOpen,
    title: 'ଗଳ୍ପ ଓ ଉପନ୍ୟାସ',
    description: 'ପ୍ରଶଂସିତ ଏବଂ ଉଦୟମାନ ଓଡ଼ିଆ ଲେଖକମାନଙ୍କର ରୋଚକ କାହାଣୀ।',
  },
  {
    icon: PenTool,
    title: 'କବିତା ସଂକଳନ',
    description: 'ମନକୁ ଚିନ୍ତାକୁ ପ୍ରେରଣା ଦେଉଥିବା ପଦ୍ୟଗୁଡ଼ିକ ଯାହା ଆତ୍ମାକୁ ସ୍ପର୍ଶ କରେ।',
  },
  {
    icon: FileText,
    title: 'ପ୍ରବନ୍ଧ ଓ ଆଲୋଚନା',
    description: 'ବିଭିନ୍ନ ବିଷୟରେ ଗଭୀର ବିଶ୍ଳେଷଣ ଏବଂ ଟିପ୍ପଣୀ।',
  },
  {
    icon: Calendar,
    title: 'ବାର୍ଷିକ ପବ୍ଲିକେଶନ୍ସ',
    description: 'ଆମର ଲୋକପ୍ରିୟ "ପଶ୍ଚିମ ମହାପୁଜା" ଶ୍ରେଣୀ ସହିତ।',
  },
  {
    icon: MapPin,
    title: 'କ୍ଷେତ୍ରୀୟ ଆଗ୍ରହ',
    description: 'ପଶ୍ଚିମ ଓଡ଼ିଶାର ସଂସ୍କୃତି, ଭ୍ରମଣ ଏବଂ ଇତିହାସ ଉପରେ ପୁସ୍ତକ।',
  },
]

// Duplicate categories for seamless loop
const duplicatedCategories = [...categories, ...categories]

export function CategoriesSection() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  useEffect(() => {
    if (!marqueeRef.current) return

    let controls: ReturnType<typeof animate> | null = null

    // Wait for layout to be calculated
    const calculateWidth = () => {
      if (!marqueeRef.current) return
      const width = marqueeRef.current.scrollWidth / 2 // Half width for seamless loop
      if (width > 0) {
        controls = animate(x, -width, {
          repeat: Infinity,
          duration: 40,
          ease: 'linear',
        })
      }
    }

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(calculateWidth, 100)

    return () => {
      clearTimeout(timeoutId)
      if (controls) {
        controls.stop()
      }
    }
  }, [x])

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-[#0A0A0A] tracking-tight">
            ଆମର ସଂଗ୍ରହ ଅନୁସନ୍ଧାନ କରନ୍ତୁ
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ବିଭିନ୍ନ ଶ୍ରେଣୀରେ ଆମର ବିସ୍ତୃତ ସଂଗ୍ରହ ଆବିଷ୍କାର କରନ୍ତୁ। ସାମ୍ପ୍ରତିକ ଗଳ୍ପ ଏବଂ ଶାସ୍ତ୍ରୀୟ ସାହିତ୍ୟରୁ ଶିକ୍ଷାମୂଳକ ବିଷୟବସ୍ତୁ ଏବଂ ବାର୍ଷିକ ବିଶେଷ ସଂସ୍କରଣ ପର୍ଯ୍ୟନ୍ତ, ପ୍ରତ୍ୟେକ ପାଠକଙ୍କ ପାଇଁ ଆମର କିଛି ଅଛି।
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="overflow-hidden relative">
          <motion.div
            ref={marqueeRef}
            className="flex gap-6"
            style={{ x, width: 'max-content' }}
          >
            {duplicatedCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={`${category.title}-${index}`}
                  className="flex-shrink-0 w-[320px] md:w-[380px] p-8 border border-gray-200 rounded-lg hover:border-[#635BFF] transition-all duration-300 bg-white hover:shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <Icon className="h-6 w-6 text-[#635BFF]" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-[#0A0A0A]">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

