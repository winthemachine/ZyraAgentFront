import { FeaturesSection } from "../containers/FeaturesSection"
import { HeroSection } from "../containers/HeroSection"
import { InsightsSection } from "../containers/InsightsSection"
import DiscoverSection from "../containers/DiscoverSection/DiscoverSection"
import { UserTestimonialsSection } from "../containers/UserTestimonialSection"
import LandingHeader from "@/components/common/LandingHeader"
import AppFooter from "@/components/common/AppFooter"
import IMAGES from "@/utils/images"

const Landing = (): JSX.Element => {
  return (
    <div className="bg-[#050510] flex flex-row justify-center w-full fixed top-0 h-screen">
      <div className="bg-[#050510] overflow-hidden w-full relative h-full overflow-y-auto">
        <LandingHeader />
        <section id="hero" className="w-full min-h-[500px] md:h-[712px] relative bg-cover bg-center py-10 md:py-0">
          <img src={IMAGES.img1} alt="" className="absolute inset-0 hidden md:flex w-full" />
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

          <div className="max-w-[90%] sm:max-w-[80%] md:max-w-[763px] mx-auto mt-[20px] md:mt-[40px] font-medium text-[#aeacac] text-base md:text-lg text-center leading-relaxed md:leading-8 px-4">
            For the first time, you can seamlessly search through multiple coins and gather Top Traders, Top Holders and
            Early Buyers or insiders, then filter them based on your preferred criterias (PNL, Winrate, Tokens Traded)
          </div>

          <div className=" bg-cover bg-center h-[202px] flex flex-col items-center justify-center mt-4 lg:mt-20 mx-4 relative">
            <img src={IMAGES.img1} alt="" className="absolute inset-0 flex md:hidden w-full" />
            <div className="bg-gradient-to-b from-[#9C46EB] to-[#3676EF] w-fit p-1.5 lg:p-2.5 rounded-full mx-auto relative">
              <div className="absolute inset-0 blur-[80px] bg-[#DFBCFF]"></div>
              <div className="bg-gradient-to-b from-[#9C46EB] to-[#3676EF] w-fit p-4 lg:p-6 rounded-full relative">
                <img
                  className="  max-w-[70px] object-cover cursor-pointer"
                  alt="Image"
                  src={IMAGES.img10}
                />
              </div>
            </div>

            <div className="w-full text-center mt-[15px] font-medium text-white text-lg sm:text-xl md:text-2xl leading-normal md:leading-[60px]">
              Press to enter
            </div>
          </div>
        </section>

        <section id="features" className="w-full px-4 sm:px-8 md:px-14 py-4 relative">
          <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] absolute top-[30%] md:top-[366px] left-[5%] md:left-[16px] bg-[#9e47ee] rounded-[35px] blur-[50px]" />
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

        <section id="testimonials" className="w-full px-4 sm:px-8 md:px-[61px] py-10 relative">
          <div className="relative w-full">
            <div className="absolute w-[300px] h-[300px] md:w-[597px] md:h-[603px] top-0 left-[-150px] md:left-[-445px] bg-[#9e47ee] rounded-full blur-[250px] md:blur-[450px]" />
            <UserTestimonialsSection />
          </div>
        </section>
        <AppFooter />
      </div>
    </div>
  )
}

export default Landing