import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { navitems } from "./constants"
import type { NavigationProps } from "./types"
import logowhite from "/logo-contrast.svg"
import logoprimary from "/logo-primary.svg"
import { Icon } from "@/components/ui/Icon/Icon"
import { useBooking } from '@/lib/blocks/BookingProvider'

export function Navigation({ onNavigate, heroHeight = 600 }: NavigationProps) {
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { openBooking } = useBooking()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > heroHeight)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [heroHeight])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-50 w-full",
          isHomePage
            ? "transition-all duration-500 " + (isScrolled ? "bg-white/25 backdrop-blur-lg shadow-xl" : "bg-transparent")
            : "bg-white shadow-md"
        )}
      >
        <div className="flex flex-col items-center relative w-full">
          <div className="flex flex-row items-center justify-between max-w-6xl w-full px-8 py-6">
            {/* Logo */}
            <Link to="/" onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false) }} className="h-full w-auto p-0 bg-transparent hover:scale-105 transition-transform flex items-center">
              <img
                src={isHomePage && !isScrolled ? logowhite : logoprimary}
                alt="Aligned West Chiropractic"
                className="h-full max-h-15 w-auto"
              />
            </Link>
            <div className="flex items-center gap-6">
              {/* Desktop Navigation Menu */}
              <ul className="hidden lg:flex gap-6 items-center">
                {navitems.map((item) => {
                  const isActive = location.pathname === `/${item.page}`
                  return (
                    <li key={item.page} className="group">
                      <Link
                        to={`/${item.page}`}
                        onClick={() => onNavigate(item.page)}
                        className={cn(
                          "relative transition-colors duration-500 px-3 py-2 font-semibold",
                          isHomePage && !isScrolled
                            ? "text-white hover:text-white/80"
                            : "text-default hover:text-primary"
                        )}
                      >
                        {item.text}
                        <span
                          className={cn(
                            "absolute bottom-0 left-0 w-full h-[2px] pointer-events-none origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100",
                            isActive && "scale-x-100",
                            isActive
                              ? isHomePage && !isScrolled
                                ? "bg-white"
                                : "bg-secondary"
                              : isHomePage && !isScrolled
                                ? "bg-white/80"
                                : "bg-secondary-light"
                          )}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Desktop Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                <button
                  onClick={() => onNavigate("signin")}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-all duration-500 font-semibold",
                    isHomePage && !isScrolled
                      ? "border-white text-white hover:bg-white hover:text-primary"
                      : "border-primary text-primary hover:bg-primary hover:text-white"
                  )}
                >
                  Sign In
                </button>
                <button
                  onClick={() => openBooking()}
                  className={cn(
                    "px-4 py-2 rounded-lg transition-all duration-500 font-semibold backdrop-blur-sm shadow-md",
                    isHomePage && !isScrolled
                      ? "bg-white/20 text-white hover:bg-white/30"
                      : "bg-primary text-white hover:bg-primary-dark"
                  )}
                >
                  Book Now
                </button>
              </div>

              {/* Mobile/Tablet Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className={cn(
                  "flex lg:hidden p-2 items-center text-white justify-center rounded-md shadow-md transition-all font-semibold text-sm uppercase",
                  isHomePage ? "bg-white/20 hover:bg-white/30" : "bg-primary hover:bg-primary-dark"
                )}
                aria-label="Toggle mobile menu"
              >
                <Icon name={isMobileMenuOpen ? "close" : "menu"} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 z-40 lg:z-40 md:z-40 sm:z-40 w-full h-screen bg-primary-95 backdrop-blur-md shadow-xl flex flex-col overflow-hidden">
          <div className="flex flex-col flex-grow overflow-y-auto h-full px-6 py-6 pt-50">
            <ul className="flex flex-col gap-4">
              {navitems.map((item) => (
                <li key={item.page}>
                  <Link
                    to={`/${item.page}`}
                    onClick={() => { onNavigate(item.page); setIsMobileMenuOpen(false) }}
                    className="block text-white font-semibold text-lg py-2 hover:text-secondary transition"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
