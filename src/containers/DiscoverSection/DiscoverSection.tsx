import IMAGES from "@/utils/images"
import { ArrowRight } from "lucide-react"

export default function DiscoverSection() {
  return (
    <div className="w-full  text-white flex items-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl md:text-3xl lg:text-6xl font-bold tracking-tight">
            Discover Smart Crypto Insights with  <p className="text-purple-400">Zyra Wallet Scavenger</p>
          </h1>

          <div className="space-y-6 text-gray-300">
            <p className="text-lg md:text-xl">
              Zyra Wallet Finder is the ultimate platform for crypto traders and enthusiasts who want deeper insights
              into wallet activities.
            </p>

            <p className="text-lg md:text-xl">
              Find Top traders, Whale wallets, Early buyers, and high-value holders effortlessly. With powerful
              filtering tools and real-time data.
            </p>

            <p className="text-lg md:text-xl">
              Zyra helps you uncover hidden opportunities, follow winning strategies, and stay ahead in the fast-moving
              crypto market all in one streamlined dashboard.
            </p>
          </div>

          <div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-medium text-lg transition-transform hover:scale-105"
            >
              Learn More
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-3xl aspect-square">
              <img
                src={IMAGES.img4}
                width={1000}
                height={1000}
                alt="Crypto security shield with orbiting elements"
                className="w-full h-full object-cover"
              />
          </div>
        </div>
      </div>
    </div>
  )
}

