'use client'
import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Props = {
  title: string
  author: string
  cover: string
  slug: string
  description?: string
  backgroundColor?: string
  textColor?: string
}

export default function Book3DCard({ title, author, cover, slug, description, backgroundColor, textColor }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch device for fallback
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (isTouch) return // Skip 3D interaction on touch devices
    
    const el = ref.current
    if (!el) return
    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      const rx = (-y) * 10
      const ry = x * 14
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const handleLeave = () => {
      el.style.transform = ''
    }
    el.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerleave', handleLeave)
    return () => {
      el.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerleave', handleLeave)
    }
  }, [isTouch])

  return (
    <Link href={`/book/${slug}`} className="flex flex-col items-center no-underline text-inherit transition-transform hover:-translate-y-1 w-full">
      <motion.div 
        className="w-full flex justify-center mb-4 sm:mb-5 md:mb-6 perspective" 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          ref={ref} 
          className="book-3d w-full max-w-full"
          style={isTouch ? { transform: 'none' } : undefined}
        >
          <div className="book-face book-front" style={{ backgroundImage: `url(${cover})` }} />
          <div className="book-face book-spine" style={{ backgroundColor: backgroundColor || '#6E665B' }} />
          <div className="book-face book-pages" />
        </div>
      </motion.div>

      <div className="text-center w-full px-2 sm:px-0">
        <h3 className="text-base sm:text-lg md:text-xl font-serif font-semibold mb-1.5 sm:mb-2 text-[#0A0A0A] tracking-tight leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        <p className="text-xs sm:text-sm text-gray-600 opacity-85">
          {author}
        </p>
      </div>
    </Link>
  )
}
