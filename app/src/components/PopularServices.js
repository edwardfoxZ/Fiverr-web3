import React, { useRef, useState } from "react";
import { gsap } from "gsap";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Cards = [
  {
    id: 0,
    title: "Website Development",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png",
    color: "#1f8447",
  },
  {
    id: 1,
    title: "Logo Design",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/logo-design.png",
    color: "#ff8757",
  },
  {
    id: 2,
    title: "SEO",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png",
    color: "#1f512f",
  },
  {
    id: 3,
    title: "Architecture & Interior Design",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png",
    color: "#633341",
  },
  {
    id: 4,
    title: "Social Media Marketing",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/social-media-marketing.png",
    color: "#7a831f",
  },
  {
    id: 5,
    title: "Video Editing",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/video-editing.png",
    color: "#c66783",
  },
  {
    id: 6,
    title: "Voice Over",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156479/voice-over.png",
    color: "#59301f",
  },
  {
    id: 7,
    title: "UGC Videos",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/ece24f7f595e2dd44b26567705d1c600-1728279781879/UGC%20Video%20img.png",
    color: "#c66783",
  },
  {
    id: 8,
    title: "Software Development",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/software-development.png",
    color: "#40591f",
  },
  {
    id: 9,
    title: "Data Science & ML",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156495/data-science.png",
    color: "#9d431f",
  },
  {
    id: 10,
    title: "Product Photography",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156481/product-photography.png",
    color: "#7a831f",
  },
  {
    id: 11,
    title: "E-Commerce Marketing",
    img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/software-development.png",
    color: "#1f8447",
  },
];

export const PopularServices = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidthFixed = 1100; //adjusted

  let itemWidthDestop;
  if (window.innerWidth >= 1920) {
    itemWidthDestop = itemWidthFixed + 100;
  }
  // if(window.innerWidth >= )

  const slideTo = (index) => {
    const slider = sliderRef.current;
    const maxIndex =
      Math.floor((Cards.length * itemWidthDestop) / itemWidthDestop) - 1;

    if (index < 0) {
      index = 0;
    } else if (index > maxIndex) {
      index = maxIndex;
    }

    gsap.fromTo(
      slider,
      { x: -currentIndex * itemWidthDestop },
      { x: -index * itemWidthDestop, duration: 0.5, ease: "power2.inOut" }
    );

    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      slideTo(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < Cards.length - 1) {
      slideTo(currentIndex + 1);
    }
  };

  return (
    <>
      <div className="flex overflow-hidden w-full">
        <div ref={sliderRef} className="flex space-x-6">
          {Cards.map((card) => (
            <div
              key={card.id}
              className="w-48 flex-shrink-0 flex flex-col items-start p-5 rounded-lg shadow-lg text-white cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: card.color }}
            >
              <h1 className="text-lg font-semibold text-start h-14">
                {card.title}
              </h1>
              <img
                draggable={false}
                src={card.img}
                alt={card.title}
                className="w-full h-32 object-cover mt-3 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 left-0 ${
          currentIndex === 0 ? "hidden" : ""
        }`}
      >
        <button
          disabled={currentIndex === 0}
          onClick={handlePrev}
          className="bg-gray-700 text-white px-4 py-4 rounded-full shadow-lg"
        >
          <IoIosArrowBack />
        </button>
      </div>
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 right-0 ${
          1 <= currentIndex ? "hidden" : ""
        }`}
      >
        <button
          disabled={1 <= currentIndex}
          onClick={handleNext}
          className="bg-gray-700 text-white px-4 py-4 rounded-full shadow-lg"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </>
  );
};
