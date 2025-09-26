'use client'

import React, { useState } from 'react'
import {
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'
import GenerationGrid, { Feature } from './GenerationGrid'
import { EditIcon, Enhancer, ImageIcon, LipSync, MotionIcon, RealTime, VideoIcon } from '../common/Icons'
import { MdModelTraining } from 'react-icons/md'


const FEATURES: Feature[] = [
  {
    title: 'Image',
    description: 'Generate images with custom styles in Flux and Ideogram.',
    isNew: true,
    icon: <ImageIcon className="size-6 text-white" />,
    iconBg: 'bg-gradient-to-br from-[#bdcddc] via-[#7c91a3] to-[#445c71]'
  },
  {
    title: 'Video',
    description: 'Generate videos with Haiku, Pika, Runway, Luma, and more.',
    icon: <VideoIcon className="size-6 text-white" />,
    iconBg: 'bg-[#f2ad17]'
  },
  {
    title: 'Realtime',
    description: 'Realtime AI rendering on a canvas. Instant feedback loops.',
    icon: <RealTime className="size-6 text-white" />,
    iconBg: 'bg-gradient-to-br from-[#9ae4fe] via-[#45bef7] to-[#2ca7ef]'
  },
  {
    title: 'Enhancer',
    description: 'Upscale and enhance images and videos up to 22K.',
    isNew: true,
    icon: <Enhancer className="size-6 text-white" />,
    iconBg: 'bg-gradient-to-br from-[#757575] via-[#414141] to-[#0f0f0f]'
  },
  {
    title: 'Edit',
    description: 'Add objects, change style, or expand photos and generations.',
    isNew: true,
    icon: <EditIcon className="size-6 text-white" />,
    iconBg: 'bg-gradient-to-br from-[#957bb8] via-[#593586] to-[#11072c]'
  },
  {
    title: 'Video Lipsync',
    description: 'Lip sync any video to any audio.',
    isNew: true,
    icon: <LipSync className="size-6 text-white" />,
    iconBg: 'bg-gradient-to-br from-[#96b494] via-[#53848b] to-[#14271b]'
  },
  {
    title: 'Motion Transfer',
    description: 'Transfer motion to images and animate characters.',
    isNew: true,
    icon: <MotionIcon className="size-10 text-white" />,
    iconBg: 'bg-[#1b1d1f]'
  },
  {
    title: 'Train',
    description: 'Teach Krea to replicate your style, products, or characters.',
    icon: <MdModelTraining size={24} />,
    iconBg: '',
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
        <div className="flex items-center gap-1">
          {toggle ? <FaChevronDown color="#4fa0ea" style={{ 
            marginTop: '3px'
          }} size={12} /> : <FaChevronUp color="#4fa0ea" size={12} />}
          <button className="text-sm text-[#4fa0ea] font-bold" type="button" onClick={toggleItem}>
            {toggle ? 'Show less' : 'Show all'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-5 gap-5 lg:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center">
        {featuresToShow.map((f) => (
          <GenerationGrid
            key={f.title}
            title={f.title}
            description={f.description}
            icon={f.icon}
            iconBg={f.iconBg}
            isNew={f.isNew}
          />
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
