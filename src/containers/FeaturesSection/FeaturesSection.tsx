import { BitcoinIcon, CoinsIcon, WalletIcon } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import IMAGES from "@/utils/images";
import { APP_ROUTES } from "@/utils/constant";
import { useNavigate } from "react-router-dom";

export const FeaturesSection = (): JSX.Element => {
  const featureCards = [
    {
      icon: <WalletIcon className="w-[50px] h-[50px]" />,
      title: "Scan",
      subtitle: "Tokens",
      description:
        "Simply add your preferred list of token addresses that you want to scan.",
      iconSrc: IMAGES.img20,
    },
    {
      icon: <CoinsIcon className="w-[50px] h-[50px]" />,
      title: "Collect",
      subtitle: "Wallets",
      description:
        "Choose to collect the Top 10 Traders, Top 10 Holders or the First 20 Buyers (Probably insiders)",
      iconSrc: IMAGES.img5,
    },
    {
      icon: <BitcoinIcon className="w-[50px] h-[50px]" />,
      title: "Filter",
      subtitle: "The 0.1% Traders",
      description:
        "Then, you simply set your preferred criteria (PNL, Winrate, Tokens) to get only the qualified ones.",
      iconSrc: IMAGES.img21,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center px-0 sm:px-8 md:px-14 py-4 md:py-20 ">
      <div className="flex flex-col items-center gap-2.5 mb-8">
        <h2 className="font-medium text-white  md:text-5xl text-center md:leading-[60px] max-w-sm">
          Zyra is as simple as it gets.
        </h2>
        <p className="font-medium text-[#AEACAC] max-md:max-w-[310px] text-sm md:text-2xl text-center leading-normal max-w-[747px]">
          Find 1000s of wallets to track in a matter of a few minutes.
        </p>
      </div>

      
      <div className="flex flex-wrap justify-center gap-2 lg:gap-11 w-full relative">
      <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] absolute top-[30%] md:top-[50%] left-[5%] md:left-[10%] bg-[#9e47ee] rounded-[35px] blur-[50px]" />

        {featureCards.map((feature, index) => (
          <Card
            key={index}
            onClick={() => {
              navigate(APP_ROUTES.HOME);
            }}
            className="w-full lg:w-[410px] hover:scale-105 duration-300 transition-all bg-transparent border-4 rounded-[20px] border-[#35353E] !text-white cursor-pointer"
          >
            <CardContent className="p-4 lg:p-8 flex flex-col items-start text-white">
              
              {feature.iconSrc.includes("solar-wallet-linear.svg") ? (
                <img
                  className="w-[50px] h-[50px]"
                  alt="Solar wallet linear"
                  src={feature.iconSrc}
                />
              ) : feature.iconSrc.includes("group.png") ? (
                <img
                  className="w-10 h-10"
                  alt="Group"
                  src={feature.iconSrc}
                />
              ) : (
                <img
                  className="w-[50px] h-[50px]"
                  alt="Tabler coin"
                  src={feature.iconSrc}
                />
              )}

              <div className="flex flex-col items-center gap-2 lg:gap-5 w-full">
                <div className="flex flex-col items-center gap-1 lg:gap-2.5">
                  <h3 className="font-semibold text-white text-[22px] lg:text-[44px] text-center lg:leading-[60px]">
                    {feature.title}
                  </h3>
                  <h4 className="font-semibold text-white text-sm lg:text-[22px] text-center leading-normal">
                    {feature.subtitle}
                  </h4>
                </div>
                <p className="font-medium max-w-[200px] lg:max-w-fit  text-white text-sm lg:text-xl text-center leading-normal">
                  {feature.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
