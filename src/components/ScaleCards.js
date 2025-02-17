import React from "react";

export const ScaleCards = () => {
  const Cards = [
    {
      id: 0,
      icon: "https://fiverr-res.cloudinary.com/npm-assets/@five…omepage_perseus/programming-tech-thin.56382a2.svg",
      title: "Programming & Tech",
    },
    {
      id: 1,
      icon: "https://fiverr-res.cloudinary.com/npm-assets/@five…omepage_perseus/programming-tech-thin.56382a2.svg",
      title: "Graphics & Design",
    },
    {
      id: 2,
      icon: "../ui/icons/Cards/programming-tech-thin.56382a2.svg",
      title: "Digital Marketing",
    },
    {
      id: 3,
      icon: "../ui/icons/Cards/programming-tech-thin.56382a2.svg",
      title: "Writting & Translation",
    },
    {
      id: 4,
      icon: "../ui/icons/Cards/programming-tech-thin.56382a2.svg",
      title: "Video & Animation",
    },
    {
      id: 5,
      icon: "../ui/icons/Cards/programming-tech-thin.56382a2.svg",
      title: "AI Services",
    },
    {
      id: 6,
      icon: "../ui/icons/Cards/programming-tech-thin.56382a2.svg",
      title: "Music & Audio",
    },
    {
      id: 7,
      icon: "../ui/icons/Cards/programming-tech-thin.56382a2.svg",
      title: "Business",
    },
    {
      id: 8,
      icon: "../ui/icons/Cards/programming-tech-thin.56382a2.svg",
      title: "Consulting",
    },
  ];
  return (
    <div className="ScaleCards w-full flex flex-row items-center justify-center gap-8 md:gap-8 mt-5">
      {Cards.map((card) => {
        return (
          <div
            className="w-32 h-32 hover-gardient-card border border-gray-100 shadow-lg rounded-3xl p-3 py-5 cursor-pointer transition-all hover:bg-hover-card-gradient"
            key={card.id}
          >
            <div className="flex flex-col items-start gap-3">
              <img src={card.icon} />
              <p className="text-start font-semibold">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
