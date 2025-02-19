import "./App.css";
import arrowAnimate from "./ui/icons/Public/arrow-down-1-svgrepo-com.svg";
import { Nav } from "./components/Nav";
import { SearchBar } from "./components/utils/SearchBar";
import { ScaleCards } from "./components/ScaleCards";
import { PopularServices } from "./components/PopularServices";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { Premimum } from "./components/Premimum";
import { Join } from "./components/Join";
gsap.registerPlugin(ScrollTrigger);

/**
 * Main application component.
 *
 * This component sets up various animations and scroll triggers using GSAP and ScrollTrigger.
 * It also manages the state for the join button and search navigation visibility.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  const [isJoinActive, setJoin] = useState(false);
  const [isSearchNavActive, setSearchNav] = useState(false);

  useEffect(() => {
    const arrow = gsap.timeline({
      scrollTrigger: {
        trigger: ".arrow-animate",
        start: "top 10%",
        end: "top 30%",
        scrub: 1,
      },
    });

    const title = gsap.timeline({
      scrollTrigger: {
        trigger: ".bg-preview-main",
        start: "top top",
        end: "top 30%",
        scrub: 1,
      },
    });

    const title_services = gsap.timeline({
      scrollTrigger: {
        trigger: ".Popular-services",
        start: "top center",
        end: "top 30%",
        scrub: 1,
        once: true,
      },
    });

    arrow.to(".arrow-animate", {
      y: 300,
      duration: 1,
      ease: "power2.inOut",
    });

    title.to(".bg-preview-main", {
      y: -300,
      duration: 1,
      ease: "power2.inOut",
    });

    title_services.fromTo(
      ".Popular-services",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.inOut",
      }
    );

    // SearchBar effect
    const searchNavTrigger = ScrollTrigger.create({
      trigger: "#Popular",
      start: "top 10%",
      end: "bottom 50%",
      onEnter: () => setSearchNav(true),
      onLeave: () => setSearchNav(false),
      onEnterBack: () => setSearchNav(true),
      onLeaveBack: () => setSearchNav(false),
    });

    return () => {
      arrow.kill();
      title.kill();
      searchNavTrigger.kill();
    };
  }, []);

  // Join active
  useEffect(() => {
    const body = document.body;

    if (isJoinActive) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [isJoinActive]);

  return (
    <div className="App w-full h-[150vh]">
      <Nav setJoin={setJoin} isSearchNavActive={isSearchNavActive} />
      <section className="w-[90vw] pt-10 mt-16 flex flex-col mx-auto sm:flex-row items-center overflow-hidden">
        <div className="bg-preview-main flex items-center justify-center mx-auto mt-16 p-8 sm:p-16 lg:p-32 max-w-full sm:max-w-[80%]">
          <header className="w-full h-full flex flex-col items-center gap-8 sm:gap-12 lg:gap-16 mt-16 sm:mt-16">
            <p className="w-full sm:max-w-3xl text-center text-white font-semibold text-4xl sm:text-5xl lg:text-6xl">
              Scale your professional workforce with{" "}
              <span className="font-agbalumo">freelancer</span>
            </p>
            <SearchBar
              iconSize={30}
              addClassInput="w-[35vh] h-14 py-5 focus:border-none focus:outline-none sm:w-[27vw] lg:w-[23vw]"
              addClassBu="top-1 right-1 w-12 bg-[#013912] rounded-lg hover:bg-[#404145] transition-all"
            />
          </header>
        </div>
        <div className="arrow-animate absolute top-[25%] sm:top-[15%] right-8 sm:right-56 lg:right-23">
          <img
            draggable={false}
            className="w-12 sm:w-14 lg-w-2"
            color="#19a463"
            src={arrowAnimate}
            alt="arrow"
          />
        </div>
      </section>
      <section className="ScaleCards w-full flex flex-row items-center justify-center gap-8 md:gap-8 mt-5">
        <ScaleCards />
      </section>
      <section
        id="Popular"
        className="Popular-services w-[75vw] sm:max-w-screen-2xl flex flex-col mx-auto"
      >
        <h1 className="text-5xl text-gray-600 font-semibold p-5 mt-16">
          Popular services
        </h1>
        <div className="relative flex flex-col items-center p-8 mt-10">
          <PopularServices />
        </div>
        <div className="Premimum w-full h-[105vh]">
          <Premimum />
        </div>
      </section>

      {isJoinActive && <Join setJoin={setJoin} />}
    </div>
  );
}

export default App;
