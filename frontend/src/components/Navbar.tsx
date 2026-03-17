import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button" // Pastikan path ini sesuai struktur folder lu
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavItem {
  path: string
  label: string
}

const navItems: NavItem[] = [
  { path: "/", label: "Beranda" },
  { path: "/detect", label: "Deteksi" },
  { path: "/about", label: "Tentang" },
  { path: "/contact", label: "Kontak" },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <div className="w-full max-w-6xl">
        <motion.div
          animate={{
            backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
            backgroundColor: scrolled
              ? "rgba(29, 29, 29, 0.6)"
              : "rgba(15, 15, 15, 0.4)",
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between rounded-2xl border border-white/10 px-6 py-3 shadow-2xl"
        >
          {/* ================= BRANDING / LOGO DESKTOP ================= */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center justify-center"
            >
              {/* Ini dia pemanggil logo.png nya */}
              <img 
                src="/logo.png" 
                alt="OenKayeeAI Logo" 
                className="w-9 h-9 object-contain drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
              />
            </motion.div>
            <span className="text-lg font-black tracking-tight text-white">
              OenKayee<span className="text-green-400">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "relative text-sm font-semibold tracking-wide transition-colors",
                    location.pathname === item.path
                      ? "text-green-400"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-green-400 rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none"
                >
                  <Menu size={20} />
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-[300px] border-r border-white/10 bg-[#052e16] text-white p-0"
              >
                <motion.div
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -80, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                  }}
                  className="flex flex-col h-full p-6"
                >
                  <SheetHeader>
                    {/* ================= BRANDING / LOGO MOBILE ================= */}
                    <SheetTitle className="flex items-center gap-3 text-white">
                      <motion.div
                        initial={{ rotate: -20, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <img 
                          src="/logo.png" 
                          alt="OenKayeeAI Logo" 
                          className="w-8 h-8 object-contain" 
                        />
                      </motion.div>
                      <span className="text-lg font-black tracking-tight">
                        OenKayee<span className="text-green-400">AI</span>
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="mt-10 flex flex-col gap-6">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{
                          delay: index * 0.07,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Link
                          to={item.path}
                          className={cn(
                            "text-lg font-semibold transition-all duration-300",
                            location.pathname === item.path
                              ? "text-green-400"
                              : "text-white/70 hover:text-white hover:translate-x-1"
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <SheetFooter className="mt-auto pt-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {/* Footer konten mobile jika ada */}
                    </motion.div>
                  </SheetFooter>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}