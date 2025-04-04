import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { TESTIMONIALS_DATA } from "@/utils/constant";
import IMAGES from "@/utils/images";

export const UserTestimonialsSection: React.FC = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-[60px] lg:gap-[120px] py-10">
      <div className="flex flex-col items-center gap-[30px] lg:gap-[60px] w-full">
        <h2 className="font-medium text-white text-4xl lg:text-5xl text-center leading-[60px]">
          What Our Users Say
        </h2>

        <div className="flex gap-4 lg:gap-12 flex-wrap justify-center items-start">
          {TESTIMONIALS_DATA.map((T) => (
            <div key={T.id} className={`${T.id % 2 === 0 ? "lg:mt-14" : ""} flex`}>
              <Card className="max-w-[154px] min-[480px]:min-w-[200px] lg:max-w-[400px] mt-[3rem] w-fit bg-[#050510] rounded-[30px] border-4 border-solid border-[#9c46eb]">
                <CardContent className="flex flex-col items-center lg:gap-[46px] pt-0 p-1 lg:p-6">
                  <img
                    className="relative lg:w-[100px] w-[40px] lg:h-[100px] h-[40px] -mt-[20px] lg:-mt-[50px]"
                    alt="User profile"
                    src={T.image}
                  />

                  <div className="flex flex-col items-center gap-4 lg:gap-10 w-full">
                    <h3 className="font-medium text-white text-xs lg:text-[26px] text-center leading-normal">
                      {T.name}
                    </h3>

                    <div className="flex flex-col gap-6 lg:gap-[30px] w-full items-center">
                      <p className="font-medium text-[#aeacac] text-xs lg:text-2xl text-center leading-normal">
                        {T.text}
                      </p>

                      <div className="flex items-center">
                        {[...Array(T.rating)].map((_, i) => (
                          <img
                            key={i}
                            className="lg:w-[34px] w-[16px] h-[16px] lg:h-[34px]"
                            alt="StarIcon rating"
                            src={IMAGES.img9}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
