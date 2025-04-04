import {
    ArrowRightIcon,
    ClockIcon,
    RefreshCwIcon,
    ShieldIcon,
    UsersIcon,
  } from "lucide-react";
  import { Button } from "../../components/ui/button";
  import { Card, CardContent } from "../../components/ui/card";
  
  export const HeroSection = (): JSX.Element => {
    const features = [
      {
        icon: <ShieldIcon className="w-[70px] h-[70px] text-[#9C46EB]" />,
        title: "Gather every wallet",
        description:
          "By simply pasting the token address you want to fetch the wallets from.",
      },
      {
        icon: <RefreshCwIcon className="w-[70px] h-[70px] text-[#9C46EB]" />,
        title: "Filtering",
        description:
          "Once you have the addresses, you can filter based on certain criteria.",
      },
      {
        icon: <ClockIcon className="w-[70px] h-[70px] text-[#9C46EB]" />,
        title: "Time Efficiency",
        description:
          "Save hours of digging and analyzing wallets through multiple platforms.",
      },
      {
        icon: <UsersIcon className="w-[70px] h-[70px] text-[#9C46EB]" />,
        title: "Increase Profits",
        description:
          "You can simply end up with the best 0.1% of the traders and copy them.",
      },
    ];
  
    return (
      <section className="flex flex-col w-full items-center gap-6 lg:gap-20 px-0 sm:px-8 md:px-14 py-4 md:py-20 ">
        <h2 className="font-medium text-3xl lg:text-5xl text-center leading-[60px]">
          <span className="text-white">Why Choose </span>
          <span className="text-[#9c46eb]">Zyra</span>
        </h2>
  
        <div className="flex flex-col items-center gap-[70px] w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 text-center justify-center gap-6 lg:gap-[100px] w-full">
            {features.map((feature, index) => (
              <Card key={index} className="w-full bg-transparent border-none">
                <CardContent className="flex flex-col items-center gap-10 p-0 w-full">
                  <div className="flex w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] items-center justify-center p-10 bg-[#050510] rounded-[75px] border border-solid border-[#9c46eb]">
                    {feature.icon}
                  </div>
                  <div className="flex flex-col items-start gap-5 w-full">
                    <h3 className="font-semibold text-white text-base lg:text-2xl text-center w-full">
                      {feature.title}
                    </h3>
                    <p className="font-medium text-[#aeacac] text-md lg:text-xl text-center w-full">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
  
          <Button className="px-[41px] py-[18px] h-[70px] rounded-[40px] bg-gradient-to-b from-[#9c46eb] to-[#3676ef] hover:opacity-90">
            <span className="font-medium text-white text-2xl">Launch Zyra</span>
            <ArrowRightIcon className="ml-5 w-[17px] h-[34px]" />
          </Button>
        </div>
      </section>
    );
  };
  