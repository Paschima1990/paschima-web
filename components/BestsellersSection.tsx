'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Book3DCard from './Book3DCard'
import type { Book } from '@/lib/getBooks'

type Props = {
  bestsellers: Book[]
}

export function BestsellersSection({ bestsellers }: Props) {
  if (bestsellers.length === 0) {
    return null
  }

  return (
    <section id="bestsellers" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 sm:mb-3 md:mb-4 text-[#0A0A0A] tracking-tight px-2">
            ସର୍ବାଧିକ ବିକ୍ରୟ
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            ଆମର ସର୍ବାଧିକ ଲୋକପ୍ରିୟ ପୁସ୍ତକଗୁଡ଼ିକ ଆବିଷ୍କାର କରନ୍ତୁ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 max-w-5xl mx-auto justify-items-center px-2 sm:px-4 md:px-0">
          {bestsellers.map((book, index) => (
            <motion.div
              key={book.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="flex justify-center w-full max-w-[280px]"
            >
              <div className="w-full">
                <Book3DCard
                  title={book.title}
                  author={book.author}
                  cover={book.cover}
                  slug={book.slug}
                  description={book.description}
                  backgroundColor={book.backgroundColor}
                  textColor={book.textColor}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16"
        >
          <Link
            href="/book"
            className="inline-flex items-center text-[#635BFF] hover:text-[#5548E5] font-medium text-sm sm:text-base md:text-lg transition-all duration-300 hover:gap-2 gap-1.5 group px-4 py-2"
          >
            ସମସ୍ତ ପୁସ୍ତକ ଦେଖନ୍ତୁ
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

