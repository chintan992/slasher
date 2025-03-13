"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, Film, Tv, Home, User } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { ModeToggle } from "./mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"
import VideoSourceSettings from "./video-source-settings"
import { motion } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isTvMode, setIsTvMode] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Detect TV mode
  useEffect(() => {
    // Check if device is likely a TV (large screen with touch disabled)
    const isTv = window.innerWidth >= 1920 && !("ontouchstart" in window)
    setIsTvMode(isTv)
  }, [])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`
      setSearchQuery("")
    }
  }

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/movies/trending", label: "Movies", icon: Film },
    { href: "/tv/trending", label: "TV Shows", icon: Tv },
  ]

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-gradient-to-b from-background to-transparent",
        isTvMode && "py-2",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className={cn("flex items-center justify-between", isTvMode ? "h-20" : "h-16")}>
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-6">
              <span className={cn("font-bold", isTvMode ? "text-2xl" : "text-xl")}>Let's Stream</span>
            </Link>

            {!isMobile && (
              <nav className="hidden md:flex items-center space-x-4">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors",
                        pathname === link.href ? "bg-accent" : "transparent",
                        isTvMode && "text-base px-4 py-3",
                      )}
                    >
                      <Icon className={cn("mr-2", isTvMode ? "h-5 w-5" : "h-4 w-4")} />
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isMobile && (
              <form onSubmit={handleSearch} className="relative mr-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className={cn("pl-8 rounded-full bg-muted", isTvMode ? "w-[300px] h-10" : "w-[200px]")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            )}

            <VideoSourceSettings />
            <ModeToggle />

            {user ? (
              <Link href="/profile">
                <Avatar className={cn(isTvMode ? "h-10 w-10" : "h-8 w-8")}>
                  <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                  <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button asChild variant="default" size={isTvMode ? "default" : "sm"}>
                <Link href="/login">Sign In</Link>
              </Button>
            )}

            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <motion.div
          className="md:hidden border-t"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-3 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      pathname === link.href ? "bg-accent" : "hover:bg-accent/50",
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}

              {user && (
                <Link
                  href="/profile"
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === "/profile" ? "bg-accent" : "hover:bg-accent/50",
                  )}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

