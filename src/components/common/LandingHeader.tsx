import React, { useEffect, useRef, useState } from 'react'
import { Menu} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/utils/constant';

const navigationItems = [
  { name: 'Home', sectionId: 'hero' },
  { name: 'Features', sectionId: 'features' },
  { name: 'Discover', sectionId: 'discover' },
  { name: 'Tools', sectionId: 'tools' },
  { name: 'Insights', sectionId: 'insights' },
  { name: 'Reviews', sectionId: 'testimonials' },
];

const LandingHeader: React.FC = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMobileMenuOpen(false);
        }
    };

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
        <div className='border-b border-[#2a2a2a] sticky top-0 bg-[#050510] z-50  h-[64px] max-h-[64px] lg:h-[76px] lg:max-h-[76px]'>
            <header className="flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 py-4 w-full min-xl:container mx-auto relative">
                <div className="container mx-auto w-full flex items-center justify-between h-full py-0 md:py-0">
                    <div className="flex items-center gap-4 sm:gap-16 cursor-pointer" onClick={() => navigate(APP_ROUTES.LANDING)}>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#9c46eb]">ZYRA</h1>
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-6">
                        {navigationItems.map((item) => (
                            <button
                                key={item.sectionId}
                                onClick={() => scrollToSection(item.sectionId)}
                                className="text-[#aeacac] hover:text-white transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to={'/home'}
                            className="hidden lg:block bg-gradient-to-r from-[#582885] to-[#9c46eb] text-white px-3 sm:px-5 py-2 rounded-full hover:opacity-90 transition text-sm sm:text-lg"
                        >
                            Sign in
                        </Link>
                        <button ref={menuButtonRef} className="lg:hidden text-white cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            <Menu size={28} />
                        </button>
                    </div>
                </div>

            </header>
                {mobileMenuOpen && (
                    <div ref={mobileMenuRef} className="lg:hidden w-full bg-[#050510] border-t border-[#484747] px-4 sm:px-6 lg:px-8 py-4 w-full min-xl:container mx-auto">
                        <nav className="flex flex-col space-y-4">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.sectionId}
                                    onClick={() => scrollToSection(item.sectionId)}
                                    className="font-medium text-[#aeacac] text-lg text-left hover:text-white transition-colors"
                                >
                                    {item.name}
                                </button>
                            ))}
                            <Link to={'/home'} className="w-full rounded-[30px] bg-gradient-to-r from-[rgba(158,71,238,1)] to-[rgba(90,41,136,1)] font-medium text-white text-lg px-4 py-1.5">
                                Sign In
                            </Link>
                        </nav>
                    </div>
                )}
        </div>
    )
}

export default LandingHeader