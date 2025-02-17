import React from "react";
import { IoMdSearch } from "react-icons/io";

export const SearchBar = ({addClass}) => {
  return (
    <div className="relative">
      <input type="text" className="w-[35vh] h-9 border border-gray-400 rounded-lg p-3" />
      <button className={`absolute right-0 p-2 ${addClass}`}>
        <IoMdSearch size={20} color="white" />
      </button>
    </div>
  );
};
