import React from 'react'
import { Menu } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/utils/constant'

const AppHeader: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className='border-b border-[#2a2a2a] sticky top-0 bg-[#050510] z-50 h-[64px] max-h-[64px]  lg:h-[76px] lg:max-h-[76px]'>
            <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 w-full min-xl:container mx-auto relative">
                <div className='flex flex-row items-center gap-6'>
                    <div className="flex items-center gap-4 sm:gap-16 cursor-pointer" onClick={() => navigate(APP_ROUTES.LANDING)}>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#9c46eb]">ZYRA</h1>
                    </div>
                    <div className="hidden lg:flex gap-6">
                        <Link to="/home" className="text-white text-lg hover:text-[#9c46eb]">
                            Home
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link to={'/home'}
                        className="hidden lg:block bg-gradient-to-r from-[#582885] to-[#9c46eb] text-white px-3 sm:px-5 py-2 rounded-full hover:opacity-90 transition text-sm sm:text-lg"
                    >
                        Account
                    </Link>
                    <button ref={menuButtonRef} className="lg:hidden text-white cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu size={28} />
                    </button>
                </div>
            </header>

            {mobileMenuOpen && (
                <div ref={mobileMenuRef} className="sticky top-0 lg:hidden bg-[#0a0a20] border-b border-[#2a2a2a] py-4 px-4">
                    <div className="flex flex-col gap-4">
                        <nav className="flex flex-col gap-4">
                            <Link to="/home" className="text-white text-lg hover:text-[#9c46eb]" onClick={() => setMobileMenuOpen(false)}>
                                Home
                            </Link>
                            <Link to="/home" className="bg-gradient-to-r from-[#582885] to-[#9c46eb] text-white px-3 sm:px-5 py-2 rounded-full hover:opacity-90 transition text-sm sm:text-lg" onClick={() => setMobileMenuOpen(false)}>
                                Account
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AppHeader