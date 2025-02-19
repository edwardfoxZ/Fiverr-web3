import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FiverrIcon from "../ui/icons/Public/svgviewer-png-output.png";
import { SearchBar } from "./utils/SearchBar";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Nav = ({
  handleJoinButtonClick,
  isSearchNavActive,
  userData,
  logoutWeb3,
}) => {
  // This useEffect hook checks if the user is logged in and updates the state accordingly.
  useEffect(() => {}, [userData]);

  const [isExploreActive, setExploreActive] = useState(false);
  const [isPopularActive, setPopularActive] = useState(false);

  const Explore = [
    {
      id: 0,
      to: "/explore/find-jobs",
      name: "Find Jobs",
    },
    {
      id: 1,
      to: "/explore/create-jobs",
      name: "Create Jobs",
    },
  ];

  const handleExplore = () => {};

  return (
    <div className="w-full bg-white fixed top-0 z-30 flex p-5 justify-center border-b border-gray-200">
      <div className="w-full flex flex-row py-3 items-center">
        <div className="flex flex-row gap-5 mr-auto pl-[13%] items-center">
          <div className="w-auto h-5">
            <img
              draggable={false}
              className="w-full h-full"
              alt="Fiverr-icon"
              src={FiverrIcon}
            />
          </div>
          {isSearchNavActive && (
            <SearchBar
              iconSize={20}
              addClassInput="w-[35vh] h-9"
              addClassBu="w-10 bg-[#212123] rounded-r-lg hover:bg-[#404145] transition-all right-0"
            />
          )}
        </div>
        <div className="relative flex flex-row items-center gap-10 pr-[13%]">
          <button
            onClick={() => setExploreActive((prev) => !prev)}
            className="flex flex-row items-center"
          >
            Explore {!isExploreActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </button>
          {/** Explore sections */}
          {isExploreActive && (
            <section className="absolute flex flex-col gap-3 items-start top-9 bg-[#ffff] shadow-md p-5 rounded-xl border">
              {Explore.map((i) => {
                return (
                  <Link
                    className="flex flex-row hover:text-[#1dbf73]"
                    key={i.id}
                    to={i.to}
                  >
                    {i.name}
                  </Link>
                );
              })}
            </section>
          )}
          <Link className="flex flex-row items-center" to="/popular">
            Popular <IoIosArrowDown />
          </Link>
          {!userData ? (
            <button onClick={handleJoinButtonClick}>Login</button>
          ) : (
            <span className="text-xs font-mono text-[#19a463]">
              {userData?.user?.address?.slice(0, 7) || "Address not available"}
              ...
            </span>
          )}
          {!userData ? (
            <button
              onClick={handleJoinButtonClick}
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
