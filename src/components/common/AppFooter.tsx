import React from 'react'

const AppFooter: React.FC = () => {
    return (
        <footer className="bg-gradient-to-b from-[#0a0a20] to-[#050510] border-t border-[#2a2a2a] py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    <div className="col-span-1 sm:col-span-2 md:col-span-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#9c46eb] mb-3 sm:mb-4">ZYRA</h3>
                        <p className="text-[#aeacac] text-sm sm:text-base">Discover and analyze the best Solana wallets</p>
                    </div>

                    <div className='text-white'>
                        <h4 className="font-medium mb-3 sm:mb-4 text-lg sm:text-xl">Feature</h4>
                        <ul className="space-y-2 sm:space-y-3 text-[#aeacac] text-sm sm:text-base">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Wallet Search
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Saved Wallets
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className='text-white'> 
                        <h4 className="font-medium mb-3 sm:mb-4 text-lg sm:text-xl">Support</h4>
                        <ul className="space-y-2 sm:space-y-3 text-[#aeacac] text-sm sm:text-base">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    API Status
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className='text-white'>
                        <h4 className="font-medium mb-3 sm:mb-4 text-lg sm:text-xl">Legal</h4>
                        <ul className="space-y-2 sm:space-y-3 text-[#aeacac] text-sm sm:text-base">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#2a2a2a] gap-4 sm:gap-0">
                    <p className="text-[#7b7a7a] text-sm sm:text-base text-center sm:text-left">
                        2023 ZYRAWALLET. All rights reserved
                    </p>
                    <div className="flex gap-4 sm:gap-6">
                        <a href="#" className="text-[#7b7a7a] hover:text-white text-sm sm:text-base">
                            Twitter
                        </a>
                        <a href="#" className="text-[#7b7a7a] hover:text-white text-sm sm:text-base">
                            Discord
                        </a>
                        <a href="#" className="text-[#7b7a7a] hover:text-white text-sm sm:text-base">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default AppFooter