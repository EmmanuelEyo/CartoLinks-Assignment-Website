'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

type Slide = {
  id: string
  title?: string
  subtitle?: string
  subSubtitle?: string
  cta?: string
  image: string
  sideImage?: string
}

const HeroCarousel: React.FC = () => {
  useTheme()
  const slides: Slide[] = [
    {
      id: 'slide1',
      title: 'WAN 2.2',
      subtitle: 'Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultra-realistic textures.',
      cta: 'Try WAN 2.2',
      image: '/slide1.webp',
    },
    {
      id: 'slide2',
      title: 'FLUX.1 Krea',
      subtitle: 'Were making the weights to our FLUX.1 Krea model open source. Download and run our model weights, read the technical report, or generate with it in krea image.',
      cta: 'Discover',
      image: '/slide2.webp',
    },
    {
      id: 'slide3',
      title: 'Slide 3',
      subtitle: 'This is the third slide with placeholder content.',
      cta: 'Learn More',
      image: '/slide3.webp',
    },
    {
      id: 'slide4',
      title: 'Slide 4',
      subtitle: 'This is the fourth slide with placeholder content.',
      cta: 'Explore',
      image: '/slide4.webp',
    },
    {
      id: 'slide5',
      title: 'Slide 5',
      subtitle: 'This is the fifth slide with placeholder content.',
      cta: 'Get Started',
      image: '/slide5.webp',
    },
          {
      id: 'slide6',
      title: 'Slide 6',
      subtitle: 'This is the sixth slide with placeholder content.',
      cta: 'Get Started',
      image: '/liquor.jpg',
    },
      {
      id: 'slide7',
      title: 'Slide 7',
      subtitle: 'This is the seventh slide with placeholder content.',
      cta: 'Get Started',
      image: '/face.jpg',
    },
      {
      id: 'slide8',
      title: 'Slide 8',
      subtitle: 'This is the eigth slide with placeholder content.',
      cta: 'Get Started',
      image: '/tattoo.jpg',
    },
      {
      id: 'slide9',
      title: 'Slide 9',
      subtitle: 'This is the ninth slide with placeholder content.',
      cta: 'Get Started',
      image: '/windmill.jpg',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [slidesPerView, setSlidesPerView] = useState<number>(1)

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(window.innerWidth < 1024 ? 1 : 2)
    }
    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  const goPrev = () => setCurrentIndex((i) => i - 1 < 0 ? slides.length - slidesPerView : i - 1)
  const goNext = () => setCurrentIndex((i) => i + 1 > slides.length - slidesPerView ? 0 : i + 1)

  return (
    <section aria-roledescription="carousel" aria-label="Hero carousel" className="mx-auto px-2 sm:px-4 lg:px-6 pt-20">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * (100 / slidesPerView)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full lg:w-[60%] flex-shrink-0 px-2">
              <div className="rounded-2xl overflow-hidden relative shadow-lg">
                <div className="relative h-64 md:h-[400px] w-full theme-bg-secondary">
                  <Image
                    src={slide.image}
                    alt={slide.title || 'Slide'}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority={index < slidesPerView}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute left-6 bottom-2 md:bottom-6 right-6 z-20 flex items-end justify-between">
                    <div className="text-left">
                      <h2 className="text-xl md:text-4xl font-semibold text-white leading-tight drop-shadow">
                        {slide.title}
                      </h2>
                      {slide.subtitle && (
                        <p className="mt-1 max-w-sm text-xs md:text-sm text-slate-200 dark:text-gray-300">
                          {slide.subtitle}
                        </p>
                      )}
                      {slide.subSubtitle && (
                        <p className="mt-1 max-w-sm text-xs md:text-sm text-slate-200 dark:text-gray-300">
                          {slide.subSubtitle}
                        </p>
                      )}
                    </div>
                    {slide.cta && (
                      <button onClick={() => {}} className="md:inline-flex hidden items-center justify-center px-3 py-1.5 md:px-4 md:py-2 rounded-full theme-bg-primary theme-text-primary text-sm md:text-base shadow">
                        {slide.cta}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center md:mr-0 lg:mr-64">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentIndex(Math.max(0, Math.min(slides.length - slidesPerView, i - (slidesPerView - 1))))}
            className={`w-2 h-2 lg:mt-2 md:mt-6 mt-3 rounded-full mx-1 ${i >= currentIndex && i < currentIndex + slidesPerView ? 'bg-black' : 'bg-gray-400'}`}
          />
        ))}
      </div>
      <div className="flex justify-end md:mr-8">
        <button onClick={goPrev} aria-label="Previous slide" className="mx-2 p-1.5 rounded-full theme-bg-secondary hover:theme-text-secondary">
          <FaChevronLeft size={12} />
        </button>
        <button onClick={goNext} aria-label="Next slide" className="mx-2 p-1.5 rounded-full theme-bg-secondary hover:theme-text-secondary">
          <FaChevronRight size={12} />
        </button>
      </div>
      <div className="sr-only" aria-live="polite">
        {`Slides ${currentIndex + 1} to ${currentIndex + slidesPerView} of ${slides.length}`}
      </div>
    </section>
  )
}

export default HeroCarousel