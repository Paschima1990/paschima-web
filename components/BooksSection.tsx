'use client'
import { motion } from 'framer-motion'
import { BookList } from './BookList'
import type { Book } from '@/lib/getBooks'

type Props = {
  books: Book[]
}

export function BooksSection({ books }: Props) {
  return (
    <section id="books" className="pt-0 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-[#0A0A0A] tracking-tight">
            ଆମର ପୁସ୍ତକଗୁଡ଼ିକ
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ଓଡ଼ିଆ ଭାଷା ପୁସ୍ତକର ଆମର ସମ୍ପୂର୍ଣ୍ଣ ସଂଗ୍ରହ ବ୍ରାଉଜ୍ କରନ୍ତୁ
          </p>
        </motion.div>
        <BookList books={books} />
      </div>
    </section>
  )
}

