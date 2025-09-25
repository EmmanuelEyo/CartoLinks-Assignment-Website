'use client'

import React, { useState } from 'react'
import { BsPersonUp } from 'react-icons/bs'
import {
  FaImage,
  FaVideo,
  FaChevronDown,
  FaBroadcastTower,
  FaChevronUp,
} from 'react-icons/fa'
import { FaWandMagicSparkles } from 'react-icons/fa6'
import { GiMicrophone } from 'react-icons/gi'
import { HiPencilSquare } from 'react-icons/hi2'
import { useTheme } from '../contexts/ThemeContext'
import { TrainIcon } from '../common/TrainIcon'

type Feature = {
  id: string
  title: string
  subtitle?: string
  isNew?: boolean
  icon: React.ReactNode
  iconStyle?: string
}

const FEATURES: Feature[] = [
  {
    id: 'image',
    title: 'Image',
    subtitle: 'Generate images with custom styles in Flux and Ideogram.',
    isNew: true,
    icon: <FaImage size={18} />,
    iconStyle: 'bg-gradient-to-br from-[#bdcddc] via-[#7c91a3] to-[#445c71]'
  },
  {
    id: 'video',
    title: 'Video',
    subtitle: 'Generate videos with Haiku, Pika, Runway, Luma, and more.',
    icon: <FaVideo size={18} />,
    iconStyle: 'bg-[#f2ad17]'
  },
  {
    id: 'realtime',
    title: 'Realtime',
    subtitle: 'Realtime AI rendering on a canvas. Instant feedback loops.',
    icon: <HiPencilSquare size={18} />,
    iconStyle: 'bg-gradient-to-br from-[#9ae4fe] via-[#45bef7] to-[#2ca7ef]'
  },
  {
    id: 'enhancer',
    title: 'Enhancer',
    subtitle: 'Upscale and enhance images and videos up to 22K.',
    isNew: true,
    icon: <FaWandMagicSparkles size={18} />,
    iconStyle: 'bg-gradient-to-br from-[#757575] via-[#414141] to-[#0f0f0f]'
  },
  {
    id: 'edit',
    title: 'Edit',
    subtitle: 'Add objects, change style, or expand photos and generations.',
    isNew: true,
    icon: <FaBroadcastTower size={18} />,
    iconStyle: 'bg-gradient-to-br from-[#957bb8] via-[#593586] to-[#11072c]'
  },
  {
    id: 'lipsync',
    title: 'Video Lipsync',
    subtitle: 'Lip sync any video to any audio.',
    isNew: true,
    icon: <GiMicrophone size={18} />,
    iconStyle: 'bg-gradient-to-br from-[#96b494] via-[#53848b] to-[#14271b]'
  },
  {
    id: 'motion',
    title: 'Motion Transfer',
    subtitle: 'Transfer motion to images and animate characters.',
    isNew: true,
    icon: <BsPersonUp size={18} />,
    iconStyle: 'bg-[#1b1d1f]'
  },
  {
    id: 'train',
    title: 'Train',
    subtitle: 'Teach Krea to replicate your style, products, or characters.',
    icon: <TrainIcon />,
  },
]


const Generate: React.FC = () => {
  useTheme()
  const [toggle, setToggle] = useState(true)

  const toggleItem = () => {
    setToggle(!toggle)
  }

  const featuresToShow = toggle ? FEATURES : FEATURES.slice(0, 4)

  return (
    <section className="mx-auto px-4 sm:px-6 pt-10">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-semibold theme-text-primary">Generate</h2>
        <div className="flex items-end gap-1">
          {toggle ? <FaChevronDown color="#4fa0ea" size={12} /> : <FaChevronUp color="#4fa0ea" size={12} />}
          <button className="text-sm text-[#4fa0ea] font-bold" type="button" onClick={toggleItem}>
            {toggle ? 'Show less' : 'Show all'}
          </button>
        </div>
      </div>

      <div
        className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuresToShow.map((f) => (
          <article key={f.id} className="flex items-center justify-between gap-2 pr-3 pt-3 bg-transparent" role="group">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-lg ${f.iconStyle} flex items-center justify-center text-white`}>
                {f.icon}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 id={`feature-${f.id}-title`} className="text-[10px] font-semibold theme-text-secondary">
                  {f.title}
                </h3>

                {f.isNew && (
                  <span className="inline-flex items-center text-[11px] font-medium bg-[#0761f9] text-[#ffffff] px-1.5 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>

              {f.subtitle && (
                <p className="text-[9px] font-semibold theme-text-secondary max-w-[145px]">
                  {f.subtitle}
                </p>
              )}
            </div>

            <div className="flex-shrink-0 ml-3">
              <button type="button" className="px-3 py-1 rounded-full theme-bg-secondary text-xs theme-text-primary hover:brightness-95" aria-label={`Open ${f.title}`}>
                Open
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 sm:hidden">
        <button className="w-full text-sm text-sky-600 py-2" type="button" onClick={toggleItem}>
          {toggle ? 'Show less' : 'Show all'}
        </button>
      </div>
    </section>
  )
}

export default Generate