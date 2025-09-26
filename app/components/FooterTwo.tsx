'use client'

import React from 'react'
import Image from 'next/image'
import { useTheme } from '../contexts/ThemeContext'
import { Logo } from '../common/logo'

const FooterTwo: React.FC = () => {
  useTheme()

  return (
    <footer className="w-full bg-[#222222]">
      <div className="mx-auto px-5 md:px-6">
        <div className="flex items-center justify-between gap-4 py-3 sm:py-4 text-sm  sm:text-base">
          <div className="flex items-center gap-3.5 w-full sm:w-auto justify-start sm:justify-start">
            <div className="flex items-center justify-center w-12 h-12 rounded-md bg-black text-white text-sm font-semibold flex-shrink-0">
              <Logo />
            </div>

            <div className="text-white lg:text-2xl md:text-lg font-normal">Krea AI</div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end sm:justify-end">
            <span className="lg:text-2xl md:text-lg text-slate-300 hidden sm:inline">curated by</span>
            <div className="flex items-center">
              <div className="h-4 sm:h-6 md:h-4 lg:h-5 xl:h-6">
                <Image src="/mobbin.png" alt="Mobbin" width={800} height={200} style={{ height: '100%', width: 'auto' }} priority={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterTwo
