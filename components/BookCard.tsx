'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Props = {
  title: string
  author: string
  slug: string
  backgroundColor: string
  textColor: string
}

export default function BookCard({ title, author, slug, backgroundColor, textColor }: Props) {
  return (
    <motion.div
      className="press-book-card"
      style={{
        '--backgroundColor': backgroundColor,
        '--color': textColor,
      } as React.CSSProperties}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/book/${slug}`} className="press-book-card__link">
        <div className="press-book-card__text">
          <h2 className="press-book-card__title">{title}</h2>
          <h3 className="press-book-card__author">{author}</h3>
        </div>
      </Link>
    </motion.div>
  )
}

