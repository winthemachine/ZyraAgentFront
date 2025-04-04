import IMAGES from "@/utils/images"
import { CheckIcon } from "lucide-react"

export const InsightsSection = (): JSX.Element => {
  const features = [
    "Fast and Smooth Performance",
    "Access Anytime, Anywhere",
    "Pick Up Where You Left Off",
    "Real-Time Syncing",
    "Secure and Reliable Access",
  ]

  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 lg:gap-[178px] w-full px-4 sm:px-8 md:px-14 py-4 md:py-20 ">
      <div className="relative flex justify-center md:justify-start">
        <img className="w-[180px] sm:w-[200px] md:w-[234px] h-auto" alt="Iphone" src={IMAGES.img15} />
      </div>

      <div className="flex flex-col w-full md:w-auto md:flex-1 items-start gap-6 md:gap-10">
        <div className="flex flex-col items-start w-full">
          <h2 className="w-full mt-[-1.00px] font-medium text-white text-2xl sm:text-3xl md:text-4xl leading-normal md:leading-[80px]">
            Seamless experience across all devices
          </h2>

          <p className="w-full font-medium text-[#aeacac] text-lg sm:text-xl md:text-2xl leading-normal mt-2 md:mt-0">
            Enjoy a seamless experience across all devices whether you&apos;re on mobile or desktop
          </p>
        </div>

        <div className="flex flex-col w-full md:max-w-[80%] lg:max-w-[70%] items-start gap-4 md:gap-[25px] ml-auto mr-0 sm:ml-8 md:ml-12 lg:ml-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 md:gap-[26px] w-full pr-4 sm:pr-8 md:pr-12 lg:pr-20">
              <div className="relative w-8 h-8 md:w-10 md:h-10 bg-[#9c46eb] rounded-full flex items-center justify-center flex-shrink-0">
                <CheckIcon className="w-4 h-4 md:w-[18px] md:h-[18px] text-white" />
              </div>

              <span className="font-medium text-[#aeacac] text-base sm:text-lg md:text-2xl leading-normal">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

