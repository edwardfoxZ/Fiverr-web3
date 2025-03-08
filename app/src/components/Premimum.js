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
      <div className="Title flex mx-auto mt-10 w-[min(100%,100wv)] h-[min(100%,100vw)] bg-[#e8faf4] rounded-2xl">
        <div className="Title-container flex flex-row-reverse max-lg:flex-col p-20">
          <div className="w-[min(50vw,100%)] h-[min(25vw,67%)] max-lg:w-[min(70vw,100%)] max-lg:h-[min(40vw,90%)] aspect-square">
            <img
              draggable={false}
              className="w-full h-full"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/2321104e0c585cceea525419551d3a7c-1721984733481/fiverr-pro.png"
              alt="Fiverr Pro Image"
            />
          </div>
          <div className="flex flex-col gap-10">
            <div className="Fiverr-pro-log w-36 h-15">
              <img
                className="w-full h-full"
                draggable={false}
                src={FiverrProIcon}
                alt="Fiverr Pro Logo"
              />
            </div>
            <div className="w-[min(90vw,80%)] text-[clamp(2.5rem,4vw,2.3rem)]">
              <p className="title">
                The{" "}
                <span className="inline-block text-[#1dbf73] font-serif">
                  premium
                </span>{" "}
                freelance solution for businesses
              </p>
            </div>
            <div className="mt-5 flex flex-row flex-wrap gap-10 max-lg:gap-20 w-[(40vw,50%)]">
              {proDetails.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col items-start gap-3 max-lg:gap-5 w-[clamp(10vw,2vw,1vw)] text-[clamp(0.2rem,4vw,1.3rem)]"
                >
                  <span>
                    <BsFillPatchCheckFill
                      size={18}
                      className="text-[#013912]"
                    />
                  </span>
                  <h1 className={`font-bold detail-${index}`}>{item.title}</h1>
                  <p
                    className={`font-medium text-[clamp(0.2rem,4vw,0.9rem)] detail-${index}`}
                  >
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-[min(50%,40%)] bg-[#101111] text-[clamp(0.2rem,2vw,.8rem)] text-white font-bold p-2 py-3 px-5 rounded-xl hover:bg-[#404145] transition-all duration-300">
              Try Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
