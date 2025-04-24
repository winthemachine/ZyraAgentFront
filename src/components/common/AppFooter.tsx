import React from 'react'

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0a0a20] to-[#050510] border-t border-[#2a2a2a] pt-8 sm:pt-12">
      <div className="">
        <div className="w-full gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col lg:flex-row  lg:items-center gap-4 sm:gap-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#9c46eb] ">ZYRA</h3>
            <p className="text-[#aeacac] text-sm sm:text-base">Discover and analyze the best Solana wallets</p>
          </div>

          {/* <div className='text-white'>
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
                    </div> */}
        </div>
        <div className='bg-[#2a2a2a] h-[1px] w-full mt-8 sm:mt-12 gap-4 sm:gap-0' />
        {/* <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-12 pt-6 sm:pt-8  gap-4 sm:gap-0 px-4 sm:px-6 lg:px-8">
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
        </div> */}
      </div>
    </footer>
  )
}

export default AppFooter