import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import arrowAnimate from "./ui/icons/Public/arrow-down-1-svgrepo-com.svg";
import { Nav } from "./components/Nav";
import { SearchBar } from "./components/utils/SearchBar";
import { ScaleCards } from "./components/ScaleCards";

function App() {
  return (
    <div className="App w-full h-full">
      <Nav />
      <div className="w-full pt-10 flex flex-col sm:flex-row items-center overflow-hidden">
        <div className="bg-preview-main flex items-center justify-center mx-auto p-8 sm:p-16 lg:p-32 max-w-full sm:max-w-[80%]">
          <header className="w-full h-full flex flex-col items-center gap-8 sm:gap-12 lg:gap-16 mt-16 sm:mt-8">
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

        <div className="arrow-animate absolute top-[25%] sm:top-[35%] right-8 sm:right-16 lg:right-56">
          <img
            draggable={false}
            className="w-12 sm:w-14"
            color="#19a463"
            src={arrowAnimate}
            alt="arrow"
          />
        </div>
      </div>
      <ScaleCards />
    </div>
  );
}

export default App;
