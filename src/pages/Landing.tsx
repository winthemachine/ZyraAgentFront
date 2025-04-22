import { FeaturesSection } from "../containers/FeaturesSection"
import { HeroSection } from "../containers/HeroSection"
import { InsightsSection } from "../containers/InsightsSection"
import DiscoverSection from "../containers/DiscoverSection/DiscoverSection"
import LandingHeader from "@/components/common/LandingHeader"
import IMAGES from "@/utils/images"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { APP_ROUTES } from "@/utils/constant"
import { useApp } from "@/hooks/useApp"

const Landing = (): JSX.Element => {
  const navigate = useNavigate();
  const { windowWidth } = useApp();

  const handleEnterClick = () => {
    navigate(APP_ROUTES.HOME);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleEnterClick();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="bg-[#050510] flex flex-row justify-center w-full fixed top-0 h-screen">
      <div className="bg-[#050510] overflow-hidden w-full relative h-full overflow-y-auto">
        <LandingHeader />
        <section id="hero" className="w-full min-h-[500px] md:h-[732px] relative bg-cover bg-center py-0">
          <img src={IMAGES.img1} alt="" className="absolute inset-0 hidden md:flex w-full h-full object-cover" />
          <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] absolute top-[70%] md:top-[436px] right-[10%] md:right-[121px] bg-[#3676ef] rounded-full blur-[50px]" />

          <div className="max-w-[90%] md:max-w-[580px] mx-auto pt-[20px] md:pt-[37px] text-center px-4">
            <div className="font-medium text-[#9c46eb] text-xl md:text-[28px] leading-normal md:leading-[80px]">
              Follow the Money
            </div>

            <h1 className="bg-gradient-to-l from-white from-80% to-[#272626] bg-clip-text text-transparent font-medium text-3xl sm:text-4xl md:text-5xl leading-tight md:leading-[64px] mt-2">
              Find the top 0.1% Traders
              <br className="hidden sm:block" />
              and follow their moves.
            </h1>
          </div>

          <div className="max-w-[90%] sm:max-w-[80%] md:max-w-[763px] mx-auto mt-[12px] md:mt-[16px] font-medium text-[#aeacac] text-base md:text-lg text-center leading-relaxed md:leading-8 px-4">
            For the first time, you can seamlessly search through multiple coins and gather Top Traders, Top Holders and
            Early Buyers or insiders, then filter them based on your preferred criterias (PNL, Winrate, Tokens Traded)
          </div>

          <div className="bg-cover bg-center h-[250px] flex flex-col items-center justify-center mt-4 lg:mt-[57px] mx-4 relative">
            <img src={ windowWidth > 768 ? IMAGES.img1 : IMAGES.mobileLandingBG} alt="" className="absolute inset-0 flex md:hidden w-full h-full object-cover" />
            <button 
              onClick={handleEnterClick}
              className="group relative transform transition-transform duration-200 hover:scale-105 active:scale-95 flex flex-col items-center justify-center"
            >
              <div className="bg-gradient-to-b from-[#9C46EB] to-[#3676EF] md:opacity-80 w-[59px] h-[59px] md:w-[196px] md:h-[196px]  p-1.5 lg:p-2.5 rounded-full relative flex items-center justify-center">
                <div className="absolute inset-0 blur-[80px] bg-gradient-to-t from-[#9C46EB] to-[#3676EF] group-hover:blur-[100px] transition-all duration-300"></div>
                <div className="bg-gradient-to-b from-[#9C46EB] to-[#3676EF] w-full h-full p-4 lg:p-6 rounded-full relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    className="max-w-[24px] md:max-w-[100px] object-cover cursor-pointer"
                    alt="Diamond Icon"
                    src={IMAGES.img10}
                  />
                </div>
              </div>
              <div className="w-full text-center mt-[15px] font-medium text-white text-lg sm:text-xl md:text-2xl leading-normal md:leading-[60px] group-hover:text-[#9C46EB] transition-colors duration-300">
                Press to enter
              </div>
            </button>
          </div>
        </section>

        <section id="features" className="w-full px-4 sm:px-8 md:px-14 py-4 relative">
          <FeaturesSection />
        </section>

        <section id="discover" className="w-full px-4 sm:px-8 md:px-14 py-4 relative">
          <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] absolute top-[30%] md:top-[366px] left-[5%] md:left-[16px] bg-[#9e47ee] rounded-[35px] blur-[50px]" />
          <DiscoverSection />
        </section>

        <section id="tools" className="w-full px-4 sm:px-8 md:px-14 py-4 relative">
          <div className="absolute w-[200px] h-[200px] md:w-[417px] md:h-[425px] top-0 right-[5%] md:right-[61px] bg-[#3676ef] rounded-full blur-[200px] md:blur-[350px]" />
          <HeroSection />
        </section>

        <section id="insights" className="mx-auto w-fit px-4 sm:px-8 md:px-[61px] py-10 relative">
          <InsightsSection />
        </section>

        {/* <section id="testimonials" className="w-full px-4 sm:px-8 md:px-[61px] py-10 relative">
          <div className="relative w-full">
            <div className="absolute w-[300px] h-[300px] md:w-[597px] md:h-[603px] top-0 left-[-150px] md:left-[-445px] bg-[#9e47ee] rounded-full blur-[250px] md:blur-[450px]" />
            <UserTestimonialsSection />
          </div>
        </section> */}
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default Landing