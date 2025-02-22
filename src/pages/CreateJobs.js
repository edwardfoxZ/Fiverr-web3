import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export const CreateJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: "",
    jobType: "Select Type",
  });
  const [isFocused, setIsFocused] = useState({
    title: false,
    desc: false,
    price: false,
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const refs = {
    title: useRef(null),
    desc: useRef(null),
    price: useRef(null),
    dropdown: useRef(null),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refs.dropdown.current &&
        !refs.dropdown.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    Object.keys(refs).forEach((key) => {
      if (key !== "dropdown") {
        gsap.to(refs[key].current, {
          y: isFocused[key] || formData[key] ? -20 : 10,
          opacity: isFocused[key] || formData[key] ? 1 : 0.5,
          scale: isFocused[key] || formData[key] ? 0.9 : 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }, [isFocused, formData]);

  const handleFocus = (key, value) =>
    setIsFocused((prev) => ({ ...prev, [key]: value }));

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="CreateJobs flex justify-center w-screen h-screen p-16">
      <div className="w-[23vw] bg-[#ebfffa] p-5 border border-gray-200 rounded-xl shadow-lg flex flex-col gap-8">
        <div>
          <Link to="/">
            <IoMdArrowBack size={23} />
          </Link>
          <h1 className="text-xl font-bold text-center">You hire!</h1>
        </div>

        {["title", "desc", "price"].map((key) => (
          <div key={key} className="relative">
            <p
              ref={refs[key]}
              className="absolute left-3 text-gray-600 text-sm font-bold pointer-events-none"
            >
              {key === "title"
                ? "Title"
                : key === "desc"
                ? "Description"
                : "Price"}
            </p>
            {key === "desc" ? (
              <textarea
                name={key}
                value={formData[key]}
                onChange={handleChange}
                onFocus={() => handleFocus(key, true)}
                onBlur={(e) => handleFocus(key, e.target.value !== "")}
                className="w-full rounded-xl shadow-md p-3 pt-6 focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <input
                name={key}
                value={formData[key]}
                onChange={handleChange}
                onFocus={() => handleFocus(key, true)}
                onBlur={(e) => handleFocus(key, e.target.value !== "")}
                className="w-full rounded-xl shadow-md p-3 pt-6 focus:ring-2 focus:ring-blue-400"
                type="text"
              />
            )}
          </div>
        ))}

        <div className="relative w-full">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full rounded-xl shadow-md p-3 bg-white border border-gray-300 text-left"
          >
            {formData.jobType}
          </button>
          {showDropdown && (
            <div
              ref={refs.dropdown}
              className="absolute w-full mt-2 bg-white shadow-md rounded-xl border z-10"
            >
              {["Full-time", "Part-time", "Freelance"].map((type) => (
                <p
                  key={type}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, jobType: type }));
                    setShowDropdown(false);
                  }}
                >
                  {type}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto">
          <button
            onClick={handleSubmit}
            className="bg-[#1dbf73] hover:bg-[#7fffc3] px-5 py-3 text-white font-medium rounded-md transition-all duration-300"
          >
            Send the job
          </button>
        </div>
      </div>
    </div>
  );
};
