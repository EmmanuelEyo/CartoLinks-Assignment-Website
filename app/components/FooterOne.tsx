'use client'

import React from 'react'
import { FaCreditCard, FaSuitcase } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

const FooterOne: React.FC = () => {
  useTheme()

  return (
    <section className="w-full">

      <div className="mx-auto px-4 sm:px-6 pt-5">
        <div
          className="flex items-center justify-between gap-3 py-2 sm:py-3 text-sm">
          <h3 className="text-sm sm:text-lg font-medium theme-text-primary">
            Gallery
          </h3>

          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <a href="#legal" className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-bg-secondary text-xs theme-text-primary shadow-sm hover:brightness-95">
              <FaSuitcase size={16} />
              <span className="hidden md:inline">Legal</span>
            </a>

            <a href="#pricing" className="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-bg-secondary text-xs theme-text-primary shadow-sm hover:brightness-95">
              <FaCreditCard size={16} />
              <span className="hidden md:inline">Pricing</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FooterOne
