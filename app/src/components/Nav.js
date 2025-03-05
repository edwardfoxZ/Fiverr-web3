import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import FiverrIcon from "../ui/icons/Public/svgviewer-png-output.png";
import { SearchBar } from "./utils/SearchBar";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Nav = ({
  addClass,
  handleJoinButtonClick,
  isSearchNavActive,
  userData,
  logoutWeb3,
  setJoin,
}) => {
  const [isExploreActive, setExploreActive] = useState(false);
  const exploreRef = useRef(null);

  const Explore = [
    {
      id: 0,
      to: "/find-jobs",
      name: "Find Jobs",
    },
    {
      id: 1,
      to: "/create-jobs",
      name: "Create Jobs",
    },
  ];

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setExploreActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full bg-white flex p-5 justify-center border-b border-gray-200 ${addClass}`}
    >
      <div className="w-full flex flex-row py-3 items-center">
        <div className="flex flex-row gap-5 mr-auto pl-[13%] items-center">
          <Link to="/" className="w-auto h-5">
            <img
              draggable={false}
              className="w-full h-full"
              alt="Fiverr-icon"
              src={FiverrIcon}
            />
          </Link>
          {isSearchNavActive && (
            <SearchBar
              iconSize={20}
              addClassInput="w-[35vh] h-9"
              addClassBu="w-10 bg-[#212123] rounded-r-lg hover:bg-[#404145] transition-all right-0"
            />
          )}
        </div>
        <div className="relative flex flex-row items-center gap-10 pr-[13%]">
          {/* Explore Dropdown */}
          <div ref={exploreRef} className="relative">
            <button
              onClick={() => setExploreActive((prev) => !prev)}
              className="flex flex-row items-center"
            >
              Explore {!isExploreActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
            {isExploreActive && (
              <section className="w-[5vw] absolute text-sm flex flex-col gap-3 items-start top-9 bg-[#ffff] shadow-md p-5 rounded-xl border">
                {Explore.map((i) => (
                  <Link
                    key={i.id}
                    to={i.to}
                    className="flex flex-row hover:text-[#1dbf73]"
                    onClick={() => setExploreActive(false)}
                  >
                    {i.name}
                  </Link>
                ))}
              </section>
            )}
          </div>

          <Link className="flex flex-row items-center" to="/popular">
            Popular <IoIosArrowDown />
          </Link>
          {userData?.user?.address && (
            <p className="text-[#19a463]">
              {userData?.user?.address?.slice(0, 8) || "Unknown"}...
            </p>
          )}
          {!userData?.user?.address ? (
            <button
              onClick={() => handleJoinButtonClick(setJoin)}
              className="bg-[#ffff] border border-[#19a463] text-[#19a463] px-3 py-1 rounded-md hover:bg-[#19a463] hover:text-white transition-colors duration-300 delay-100"
            >
              Join
            </button>
          ) : (
            <button
              onClick={logoutWeb3}
              className="bg-[#222222] border border-[#232323] text-[#ffffff] px-3 py-1 rounded-md hover:bg-[#575757] hover:text-white transition-colors duration-300 delay-100"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
