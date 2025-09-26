'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion, PanInfo } from 'framer-motion'
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
    { id: 'slide1', title: 'WAN 2.2', subtitle: 'Generate complex images with advanced AI models.', cta: 'Try WAN 2.2', image: '/slide1.webp' },
    { id: 'slide2', title: 'FLUX.1 Krea', subtitle: 'Cutting-edge image synthesis for creative professionals.', cta: 'Discover', image: '/slide2.webp' },
    { id: 'slide3', title: 'Stable Diffusion XL', subtitle: 'High-resolution image generation with open-source power.', cta: 'Generate', image: '/slide3.webp' },
    { id: 'slide4', title: 'Midjourney v6', subtitle: 'AI art creation with stunning visual quality and style.', cta: 'Create Art', image: '/slide4.webp' },
    { id: 'slide5', title: 'DALL-E 3', subtitle: 'Transform text into detailed, imaginative images.', cta: 'Imagine', image: '/slide5.webp' },
    { id: 'slide6', title: 'Craiyon', subtitle: 'Free AI image generator for quick and fun creations.', cta: 'Draw', image: '/liquor.jpg' },
    { id: 'slide7', title: 'This Person Does Not Exist', subtitle: 'Generate realistic human faces with GAN technology.', cta: 'Generate Faces', image: '/face.jpg' },
    { id: 'slide8', title: 'Artbreeder', subtitle: 'Evolve and blend images with collaborative AI.', cta: 'Breed Art', image: '/tattoo.jpg' },
    { id: 'slide9', title: 'Runway ML', subtitle: 'AI tools for video editing and creative workflows.', cta: 'Edit Videos', image: '/windmill.jpg' },
  ]

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [slidesPerView, setSlidesPerView] = useState<number>(1)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const translatePercent = slidesPerView === 1 ? 100 : 60

  useEffect(() => {
    const updateSlidesPerView = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      setSlidesPerView(mobile ? 1 : 2)
    }
    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  const positionsCount = Math.max(1, slides.length - slidesPerView + 1)

  useEffect(() => {
    setCurrentIndex((ci) => Math.min(ci, Math.max(0, slides.length - slidesPerView)))
  }, [slidesPerView, slides.length])

  const goPrev = () =>
    setCurrentIndex((i) => (i - 1 < 0 ? positionsCount - 1 : i - 1))

  const goNext = () =>
    setCurrentIndex((i) => (i + 1 >= positionsCount ? 0 : i + 1))

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const slideWidth = window.innerWidth
    const delta = -offset / slideWidth
    const targetIndex = Math.round(currentIndex + delta)
    setCurrentIndex(Math.max(0, Math.min(positionsCount - 1, targetIndex)))
  }

  return (
    <section aria-roledescription="carousel" aria-label="Hero carousel" className="mx-auto px-2 sm:px-4 lg:px-6 pt-10 md:pt-20">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * translatePercent}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 50 }}
          {...(isMobile && { drag: "x", dragElastic: 0, dragConstraints: { left: -(positionsCount - 1) * window.innerWidth, right: 0 }, onDragEnd: handleDragEnd })}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full lg:w-[60%] flex-shrink-0 px-5">
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
                      <button onClick={() => {}} className="md:inline-flex cursor-pointer hidden items-center justify-center px-3 py-1.5 md:px-4 md:py-2 rounded-full theme-bg-primary theme-text-primary text-sm md:text-base shadow">
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

      <div className="flex justify-center md:mr-0 lg:mr-64 mt-3">
        {Array.from({ length: positionsCount }).map((_, p) => (
          <button
            key={p}
            onClick={() => setCurrentIndex(p)}
            aria-label={`Go to slide ${p + 1}`}
            className={`w-2 h-2 cursor-pointer lg:mt-2 md:mt-6 mt-3 rounded-full mx-1 ${p === currentIndex ? 'bg-black' : 'bg-gray-400'}`}
          />
        ))}
      </div>

      <div className="flex justify-end md:mr-8 mt-3">
        <button onClick={goPrev} aria-label="Previous slide" className="mx-2 p-1.5 cursor-pointer rounded-full theme-bg-secondary hover:theme-text-secondary">
          <FaChevronLeft size={12} />
        </button>
        <button onClick={goNext} aria-label="Next slide" className="mx-2 p-1.5 cursor-pointer rounded-full theme-bg-secondary hover:theme-text-secondary">
          <FaChevronRight size={12} />
        </button>
      </div>

      <div className="sr-only" aria-live="polite">
        {`Slides ${currentIndex + 1} to ${Math.min(currentIndex + slidesPerView, slides.length)} of ${slides.length}`}
      </div>
    </section>
  )
}

export default HeroCarousel
