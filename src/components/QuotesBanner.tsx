import React, { useState, useEffect } from 'react'
import { Quote, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

export const QuotesBanner: React.FC = () => {
  const quotes = [
    {
      text: "Job is equal to joining in others business.",
      author: "Ancient Modern Proverb",
      tag: "Career Truth"
    },
    {
      text: "Socrates said 'Know Thyself.' 10x Job Hunt says 'Know Thy Market Value.'",
      author: "The Greek Oracle",
      tag: "Philosophy"
    },
    {
      text: "Why build someone else's empire for free when you can get paid 10x to conquer it?",
      author: "Corporate Stoic",
      tag: "Mindset"
    },
    {
      text: "A resume is simply your highlight reel of corporate diplomacy.",
      author: "The Career Agora",
      tag: "Hiring Reality"
    },
    {
      text: "Philosophers debated free will for 2,000 years. We just want flexible remote hours.",
      author: "Digital Sage",
      tag: "Work-Life"
    },
    {
      text: "Stop firing 500 applications into the void. Mount Olympus only selects the top 10.",
      author: "10x Creed",
      tag: "Efficiency"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [quotes.length])

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length)
  }

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length)
  }

  const current = quotes[currentIndex]

  return (
    <div className="bg-gradient-to-r from-lavender-100/80 via-white to-lavender-100/80 border-y border-lavender-200 py-4 my-2">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <button
          onClick={prevQuote}
          className="p-1.5 rounded-full hover:bg-lavender-200/60 text-lavender-700 transition-colors shrink-0"
          title="Previous quote"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-center flex-1 min-w-0 transition-opacity duration-300">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-lavender-200/60 text-lavender-800 text-[10px] font-bold font-greek tracking-wider uppercase mb-1">
            <Quote className="w-2.5 h-2.5 text-lavender-700" />
            <span>{current.tag}</span>
          </div>

          <p className="text-sm sm:text-base font-bold text-surface-darkText font-greek tracking-tight line-clamp-2">
            “{current.text}”
          </p>
          <span className="text-[11px] text-lavender-700 font-medium font-sans">
            — {current.author}
          </span>
        </div>

        <button
          onClick={nextQuote}
          className="p-1.5 rounded-full hover:bg-lavender-200/60 text-lavender-700 transition-colors shrink-0"
          title="Next quote"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
