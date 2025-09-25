'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  FaImage,
  FaVideo,
  FaBell,
  FaChevronDown,
  FaBroadcastTower,
  FaBars,
  FaFolder,
  FaTimes,
} from 'react-icons/fa'
import { MdLightMode, MdDarkMode, MdOutlineSupportAgent } from "react-icons/md";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { HiPencilSquare } from "react-icons/hi2";
import { useTheme } from '../contexts/ThemeContext';
import { Logo } from '../common/logo';
import { Home } from '../common/Home';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const cx = (...args: Array<string | false | null | undefined>) =>
    args.filter(Boolean).join(' ')

  type NavItem = {
    id: string
    title?: string
    icon: React.ReactNode
  }

  const NAV_ITEMS: NavItem[] = [
    { id: 'home', title: 'Home', icon: <Home /> },
    { id: 'images', title: 'Images', icon: <FaImage size={16} /> },
    { id: 'video', title: 'Video', icon: <FaVideo size={16} /> },
    { id: 'sparkle', title: 'Sparkle', icon: <FaWandMagicSparkles size={16} /> },
    { id: 'pencil', title: 'Pencil', icon: <HiPencilSquare size={16} /> },
    { id: 'tower', title: 'Tower', icon: <FaBroadcastTower size={16} /> },
    { id: 'folder', title: 'Files', icon: <FaFolder size={16} /> },
  ]

  const [active, setActive] = useState<string>('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)
  const openButtonRef = useRef<HTMLButtonElement | null>(null)

  const IconButton: React.FC<{children: React.ReactNode; active?: boolean; onClick?: () => void}> = ({ children, active, onClick }) => (
    <button
      type="button"
      aria-pressed={!!active}
      onClick={onClick}
      className={cx(
        'flex items-center justify-center w-10 h-8 rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        active ? 'bg-white shadow-md' : 'hover:bg-slate-100'
      )}
    >
      <span className={cx(active && theme === 'dark' && 'text-black')}>
        {children}
      </span>
    </button>
  )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        openButtonRef.current?.focus()
      }

      if (e.key === 'Tab' && isMobileMenuOpen && menuRef.current) {
        const focusables = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter(el => !el.hasAttribute('disabled'))

        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const activeEl = document.activeElement

        if (!e.shiftKey && activeEl === last) {
          e.preventDefault()
          first.focus()
        } else if (e.shiftKey && activeEl === first) {
          e.preventDefault()
          last.focus()
        }
      }
    }

    function onMousedown(e: MouseEvent) {
      if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false)
        openButtonRef.current?.focus()
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', onKeyDown)
      document.addEventListener('mousedown', onMousedown)
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', onKeyDown)
        document.removeEventListener('mousedown', onMousedown)
        document.body.style.overflow = previous
      }
    }
    return () => {}
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (isMobileMenuOpen && menuRef.current) {
      const firstBtn = menuRef.current.querySelector<HTMLButtonElement>('button[data-mobile-first]')
      firstBtn?.focus()
    }
  }, [isMobileMenuOpen])

  return (
    <header className="w-full theme-bg-primary backdrop-blur sticky top-0 z-50">
      <div className="px-3 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center theme-text-primary md:text-3xl text-xl font-bold">
              <Logo />
            </div>

            <div className="hidden sm:block w-8 h-8 ml-6 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 ring-1 ring-white/60 dark:ring-gray-600" title="User" role="img" />

            <div className="hidden sm:flex items-center gap-2 min-w-0">
              <span className="text-sm font-semibold theme-text-secondary truncate">
                benevolentnimblebat
              </span>
              <FaChevronDown color='text-[#757575] dark:text-gray-400' />
            </div>

            <div className="md:hidden relative">
              <button
                ref={openButtonRef}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                className="flex items-center justify-center w-10 h-8 rounded-md theme-bg-secondary hover:theme-bg-tertiary transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
              </button>

              {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
              )}

              <div
                id="mobile-menu"
                ref={menuRef}
                role="menu"
                aria-hidden={!isMobileMenuOpen}
                className={cx(
                  'fixed left-4 right-4 top-16 z-50 mx-auto max-w-md transform-gpu rounded-2xl overflow-hidden transition-all duration-200',
                  isMobileMenuOpen
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 -translate-y-2 scale-[0.98] pointer-events-none'
                )}
                style={{ willChange: 'opacity, transform' }}
              >
                <div className="theme-bg-primary theme-shadow border theme-border rounded-2xl">
                  {/* Header inside panel */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Logo />
                      <div className="text-sm font-semibold theme-text-primary">Krea</div>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-md hover:theme-bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      aria-label="Close menu"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="border-t theme-border" />

                  <nav className="flex flex-col py-2" aria-label="Mobile navigation">
                    {NAV_ITEMS.map((item, idx) => (
                      <button
                        key={item.id}
                        role="menuitem"
                        data-mobile-first={idx === 0 ? true : undefined}
                        onClick={() => {
                          setActive(item.id)
                          setIsMobileMenuOpen(false)
                          openButtonRef.current?.focus()
                        }}
                        className={cx(
                          'flex items-center gap-3 px-4 py-3 text-left text-sm w-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                          active === item.id
                            ? 'theme-bg-secondary font-semibold'
                            : 'hover:theme-bg-secondary'
                        )}
                      >
                        <span className={cx("w-6 h-6 flex items-center justify-center text-lg", active === item.id && theme === 'dark' && 'text-black')}>{item.icon}</span>
                        <span className="flex-1 truncate">{item.title}</span>
                        {active === item.id && <span className="text-xs theme-text-secondary">Active</span>}
                      </button>
                    ))}

                    <div className="px-4 pt-2 pb-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {}}
                          className="flex-1 px-3 py-2 rounded-md text-sm font-medium hover:theme-bg-secondary focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          <div className="flex items-center gap-2">
                            <FaImage /> <span>Gallery</span>
                          </div>
                        </button>

                        <button
                          onClick={() => {}}
                          className="flex-1 px-3 py-2 rounded-md text-sm font-medium hover:theme-bg-secondary focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                          <div className="flex items-center gap-2">
                            <MdOutlineSupportAgent /> <span>Support</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <nav aria-label="Main navigation" className="relative">
              <div className="hidden md:flex rounded-b-2xl rounded-t-2xl theme-bg-secondary py-3 items-center gap-2">
                <div className="w-2" />

                {NAV_ITEMS.map((item) => (
                  <IconButton key={item.id} active={active === item.id} onClick={() => setActive(item.id)}>
                    {item.icon}
                  </IconButton>
                ))}

                <div className="w-2" />
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex justify-between items-center px-3 py-2 rounded-b-xl rounded-t-xl theme-bg-secondary gap-1.5">
              <FaImage size={16} />
              <button className="hidden md:inline-flex items-center text-sm font-semibold theme-text-primary">
                Gallery
              </button>
            </div>

            <div className="hidden sm:flex justify-between items-center gap-1.5 px-3 py-2 rounded-b-xl rounded-t-xl theme-bg-secondary">
              <MdOutlineSupportAgent size={16} />
              <button className="hidden md:inline-flex items-center text-sm font-semibold theme-text-primary">
                Support
              </button>
            </div>

            <button className="px-3 py-2 rounded-full theme-bg-secondary hover:theme-bg-tertiary transition-colors duration-200">
              <FaBell />
            </button>
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-full theme-bg-secondary hover:theme-bg-tertiary transition-colors duration-200"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <MdLightMode size={16} /> : <MdDarkMode size={16} />}
            </button>

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 ring-1 ring-white/60 dark:ring-gray-600" title="User" role="img"/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
