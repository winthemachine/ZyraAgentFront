export const CallToActionSection = (): JSX.Element => {
  
  const featureLinks = [
    { title: "Dashboard", href: "#" },
    { title: "Wallet Search", href: "#" },
    { title: "Saved Wallets", href: "#" },
  ]

  
  const supportLinks = [
    { title: "Help Center", href: "#" },
    { title: "API Status", href: "#" },
    { title: "Settings", href: "#" },
  ]

  
  const legalLinks = [
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
  ]

  
  const socialLinks = [
    { title: "Twitter", href: "#" },
    { title: "Discord", href: "#" },
    { title: "GitHub", href: "#" },
  ]

  return (
    <footer className="w-full py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10 md:gap-16 lg:gap-[119px]">
          
          <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-12 lg:gap-20">
            
            <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 w-full md:max-w-[361px] md:w-[361px]">
              <h2 className="font-semibold text-[#9c46eb] text-2xl md:text-[28px] lg:text-[32px]">ZYRA</h2>
              <p className="font-medium text-[#aeacac] text-base md:text-lg lg:text-xl">
                Discover and analyze the best Solana wallets
              </p>
            </div>

            <div className="flex flex-wrap gap-8 sm:gap-12 md:gap-16 lg:gap-[181px]">
              
              <div className="flex flex-col gap-4 md:gap-6 lg:gap-[38px] w-full xs:w-auto md:w-[136px]">
                <h3 className="font-semibold text-white text-xl md:text-2xl">Feature</h3>
                <nav className="flex flex-col gap-3 md:gap-4 lg:gap-5">
                  {featureLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="font-medium text-[#aeacac] text-base md:text-lg lg:text-xl"
                    >
                      {link.title}
                    </a>
                  ))}
                </nav>
              </div>

              
              <div className="flex flex-col gap-4 md:gap-6 lg:gap-[38px] w-full xs:w-auto md:w-[116px]">
                <h3 className="font-semibold text-white text-xl md:text-2xl">Support</h3>
                <nav className="flex flex-col gap-3 md:gap-4 lg:gap-5">
                  {supportLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="font-medium text-[#aeacac] text-base md:text-lg lg:text-xl"
                    >
                      {link.title}
                    </a>
                  ))}
                </nav>
              </div>

              
              <div className="flex flex-col gap-4 md:gap-6 lg:gap-[38px] w-full xs:w-auto md:w-[162px]">
                <h3 className="font-semibold text-white text-xl md:text-2xl">Legal</h3>
                <nav className="flex flex-col gap-3 md:gap-4 lg:gap-5">
                  {legalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="font-medium text-[#aeacac] text-base md:text-lg lg:text-xl"
                    >
                      {link.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-0 sm:justify-between">
            <p className="font-medium text-[#7b7a7a] text-base md:text-lg lg:text-xl text-center sm:text-left">
              2025 ZYRAWALLET. All rights reserved
            </p>

            <div className="flex items-center gap-4 md:gap-5 lg:gap-7 flex-wrap justify-center sm:justify-end">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-medium text-[#aeacac] text-base md:text-lg lg:text-xl whitespace-nowrap"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

