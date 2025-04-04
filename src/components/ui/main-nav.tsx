"use client"


import { Menu, X } from "lucide-react"
import { useState } from "react"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex items-center gap-6 md:gap-10">
      <a href="/" className="flex items-center gap-2 text-2xl font-bold z-20" style={{ color: "#9c46eb" }}>
        ZYRA
      </a>

      
      <button className="md:hidden ml-auto z-20" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
        {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
      </button>

      
      <nav className="hidden md:flex gap-6">
        <a href="#" className="text-sm font-medium text-white/80 hover:text-white">
          Home
        </a>
        <a href="#" className="text-sm font-medium text-white/80 hover:text-white">
          Saved
        </a>
        <a href="#" className="text-sm font-medium text-white/80 hover:text-white">
          API Status
        </a>
      </nav>

      
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#050510] z-10 flex flex-col pt-20 px-6 md:hidden">
          <a
            href="#"
            className="py-3 text-lg font-medium text-white/80 hover:text-white border-b border-[#484848]"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#"
            className="py-3 text-lg font-medium text-white/80 hover:text-white border-b border-[#484848]"
            onClick={() => setIsMenuOpen(false)}
          >
            Saved
          </a>
          <a
            href="#"
            className="py-3 text-lg font-medium text-white/80 hover:text-white border-b border-[#484848]"
            onClick={() => setIsMenuOpen(false)}
          >
            API Status
          </a>
          <a
            href="#"
            className="py-3 text-lg font-medium text-white/80 hover:text-white border-b border-[#484848]"
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </a>
          <a
            href="#"
            className="py-3 text-lg font-medium text-white/80 hover:text-white border-b border-[#484848]"
            onClick={() => setIsMenuOpen(false)}
          >
            Account
          </a>
        </div>
      )}
    </div>
  )
}

