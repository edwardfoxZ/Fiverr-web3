import React, { useRef, useState, useEffect } from "react";
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
  const [cardWidth, setCardWidth] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3); // Added state for itemsPerSlide
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Resize event handler for updating card width and number of items per slide.
  const handleResize = () => {
    const sliderWidth = window.innerWidth;
    let newItemsPerSlide = 3;

    if (sliderWidth <= 640) {
      newItemsPerSlide = 1; // Small phones
    } else if (sliderWidth <= 768) {
      newItemsPerSlide = 2; // Medium phones
    } else if (sliderWidth <= 1024) {
      newItemsPerSlide = 3; // Tablets and small laptops
    } else if (sliderWidth >= 1025) {
      newItemsPerSlide = 4; // Desktops and large screens
    }

    setItemsPerSlide(newItemsPerSlide);

    // Dynamically calculate the card width based on the first card
    const cardElement = sliderRef.current
      ? sliderRef.current.children[0]
      : null;
    if (cardElement) {
      if (sliderWidth >= 1025) {
        setCardWidth(cardElement.offsetWidth + 500);
      } else if (sliderWidth >= 1024) {
        setCardWidth(cardElement.offsetWidth + 350);
      } else {
        setCardWidth(cardElement.offsetWidth + 450);
      }
    }
  };

  // Handle touch start event
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch end event
  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);

    // Calculate swipe direction
    if (touchStart - touchEnd > 100) {
      // Swipe left (next)
      handleNext();
    } else if (touchEnd - touchStart > 100) {
      // Swipe right (prev)
      handlePrev();
    }
  };

  useEffect(() => {
    handleResize(); // Initial call on page load
    window.addEventListener("resize", handleResize); // Attach resize event
    return () => window.removeEventListener("resize", handleResize); // Clean up
  }, []);

  const totalItems = Cards.length;
  const maxIndex = Math.ceil(totalItems / itemsPerSlide) - 1;

  const disabledButtonLeft = currentIndex === 0;
  const disabledButtonRight = currentIndex === maxIndex;

  const slideTo = (index) => {
    const slider = sliderRef.current;
    if (index < 0) {
      index = 0;
    } else if (index > maxIndex) {
      index = maxIndex;
    }

    gsap.fromTo(
      slider,
      { x: -currentIndex * cardWidth },
      {
        x: -index * cardWidth,
        duration: 0.5,
        ease: "power2.inOut",
      }
    );
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      slideTo(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      slideTo(currentIndex + 1);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={sliderRef} className="w-full flex space-x-4">
        {Cards.map((card, index) => (
          <div
            key={card.id}
            className="flex-shrink-0 w-[min(12rem,70vw)] p-5 rounded-lg shadow-lg text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: card.color }}
          >
            <h1 className="text-lg font-semibold text-start h-14">
              {card.title}
            </h1>
            <img
              draggable={false}
              src={card.img}
              alt={card.title}
              className="max-w-full aspect-square h-auto object-cover mt-3 rounded-md"
            />
          </div>
        ))}
      </div>

      {itemsPerSlide > 1 && (
        <>
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 left-0 ${
              disabledButtonLeft ? "hidden" : ""
            }`}
          >
            <button
              disabled={disabledButtonLeft}
              onClick={handlePrev}
              className="bg-gray-700 text-white px-4 py-4 rounded-full shadow-lg"
            >
              <IoIosArrowBack />
            </button>
          </div>

          <div
            className={`absolute top-1/2 transform -translate-y-1/2 right-0 ${
              disabledButtonRight ? "hidden" : ""
            }`}
          >
            <button
              disabled={disabledButtonRight}
              onClick={handleNext}
              className="bg-gray-700 text-white px-4 py-4 rounded-full shadow-lg"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
