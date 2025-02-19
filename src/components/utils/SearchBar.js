import React from "react";
import { IoMdSearch } from "react-icons/io";


export const SearchBar = ({ addClassBu, addClassInput, iconSize }) => {
  return (
    <div className="relative SearchBar">
      <input
        type="text"
        className={`border border-gray-400 rounded-lg p-3 ${addClassInput}`}
      />
      <button className={`absolute p-2 ${addClassBu}`}>
        <IoMdSearch size={iconSize} color="white" />
      </button>
    </div>
  );
};
