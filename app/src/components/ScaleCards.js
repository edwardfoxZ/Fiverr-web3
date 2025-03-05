import React, { useEffect } from "react";
import {
  FaCode,
  FaBrush,
  FaChartLine,
  FaPenFancy,
  FaVideo,
  FaCentos,
  FaMusic,
  FaBusinessTime,
  FaRegAddressCard,
} from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const ScaleCards = () => {
  useEffect(() => {
    const scaleCard = gsap.timeline({
      scrollTrigger: {
        trigger: ".ScaleCards",
        start: "top bottom",
        end: "top 30%",
        scrub: 1,
        once: true,
      },
    });

    scaleCard.fromTo(
      ".ScaleCards",
      {
        x: "-300",
      },
      { x: 0, duration: 1, ease: "power2.inOut" }
    );
  }, []);

  const Cards = [
    {
      id: 0,
      icon: <FaCode size={23} />,
      title: "Programming & Tech",
    },
    {
      id: 1,
      icon: <FaBrush size={23} />,
      title: "Graphics & Design",
    },
    {
      id: 2,
      icon: <FaChartLine size={23} />,
      title: "Digital Marketing",
    },
    {
      id: 3,
      icon: <FaPenFancy size={23} />,
      title: "Writing & Translation",
    },
    {
      id: 4,
      icon: <FaVideo size={23} />,
      title: "Video & Animation",
    },
    {
      id: 5,
      icon: <FaCentos size={23} />,
      title: "AI Services",
    },
    {
      id: 6,
      icon: <FaMusic size={23} />,
      title: "Music & Audio",
    },
    {
      id: 7,
      icon: <FaBusinessTime size={23} />,
      title: "Business",
    },
    {
      id: 8,
      icon: <FaRegAddressCard size={23} />,
      title: "Consulting",
    },
  ];
  return (
    <>
      {Cards.map((card) => {
        return (
          <div
            className="w-32 h-32 bg-white border border-gray-100 shadow-lg rounded-3xl p-3 py-5 cursor-pointer hover:bg-hover-gardient-card transition-all duration-300 ease-in-out transform delay-100 hover:scale-105 hover:shadow-xl"
            key={card.id}
          >
            <div className="flex flex-col items-start gap-3">
              {card.icon}
              <p className="text-start font-semibold">{card.title}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
