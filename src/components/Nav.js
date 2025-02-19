import React from "react";
import { Link } from "react-router-dom";

import FiverrIcon from "../ui/icons/Public/svgviewer-png-output.png";
import { SearchBar } from "./utils/SearchBar";
import { IoIosArrowDown } from "react-icons/io";

export const Nav = ({ setJoin, isSearchNavActive }) => {
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
        <div className="flex flex-row items-center gap-10 pr-[13%]">
          <Link className="flex flex-row items-center" to="/explore">
            Explore <IoIosArrowDown />
          </Link>
          <Link className="flex flex-row items-center" to="/popular">
            Popular <IoIosArrowDown />
          </Link>
          <Link to="/login">Login</Link>
          <button
            onClick={() => setJoin(true)}
            className="bg-[#ffff] border border-[#19a463] text-[#19a463] px-3 py-1 rounded-md hover:bg-[#19a463] hover:text-white transition-colors duration-300 delay-100"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};
