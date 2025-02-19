import React, { useEffect, useRef } from "react";
import FiverrProIcon from "../ui/icons/Public/fiverrPro.png";
import { BsFillPatchCheckFill } from "react-icons/bs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const proDetails = [
  {
    id: 0,
    title: "Dedicated hiring experts",
    detail:
      "Count on an account manager to find you the right talent and see to your project’s every need.",
  },
  {
    id: 1,
    title: "Satisfaction guarantee",
    detail:
      "Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.",
  },
  {
    id: 2,
    title: "Advanced management tools",
    detail: "Seamlessly integrate freelancers into your team and projects.",
  },
  {
    id: 3,
    title: "Flexible payment models",
    detail:
      "Pay per project or opt for hourly rates to facilitate longer-term collaboration.",
  },
];

export const Premimum = () => {
  useEffect(() => {
    gsap.fromTo(
      ".Title-container",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".Title",
          start: "top 80%",
          end: "center 100%",
          scrub: true,
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".title",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".Title",
          start: "top 70%",
          end: "center 100%",
          scrub: true,
          once: true,
        },
      }
    );

    proDetails.forEach((item, index) => {
      gsap.fromTo(
        `.detail-${index}`,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: index * 0.2, // Stagger the animations
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.detail-${index}`,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <>
      <div className="Title flex mx-auto mt-10 w-full h-[55%] sm:h-[55%] bg-[#e8faf4] rounded-2xl">
        <div className="Title-container flex flex-row p-20">
          <div className="flex flex-col gap-10">
            <div className="Fiverr-pro-log w-36 h-15">
              <img
                className="w-full h-full"
                draggable={false}
                src={FiverrProIcon}
                alt="Fiverr Pro Logo"
              />
            </div>
            <div className="w-[20vw] lg:w-[60%]">
              <p className="title text-5xl max-sm:text-4xl">
                The{" "}
                <span className="inline-block text-[#1dbf73] font-serif">
                  premium
                </span>{" "}
                freelance solution for businesses
              </p>
            </div>
            <div className="mt-5 flex flex-row flex-wrap gap-10 w-[30vw] lg:max-w-3xl">
              {proDetails.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col items-start gap-3 w-[12vw]"
                >
                  <span>
                    <BsFillPatchCheckFill
                      size={18}
                      className="text-[#013912]"
                    />
                  </span>
                  <h1
                    className={`font-bold text-xl sm:text-lg detail-${index}`}
                  >
                    {item.title}
                  </h1>
                  <p className={`font-medium sm:text-sm detail-${index}`}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-32 bg-[#101111] text-white text-lg font-bold p-2 py-3 px-5 rounded-xl hover:bg-[#404145] transition-all duration-300">
              Try Now
            </button>
          </div>
          <div className="w-[25vw] h-[18vw] sm:w-[30vw]">
            <img
              draggable={false}
              className="w-full h-full"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/2321104e0c585cceea525419551d3a7c-1721984733481/fiverr-pro.png"
              alt="Fiverr Pro Image"
            />
          </div>
        </div>
      </div>
    </>
  );
};
