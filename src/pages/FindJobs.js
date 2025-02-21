import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import useWeb3 from "../hooks/useWeb3";
import { CiStar } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { RiArrowRightDoubleLine, RiArrowLeftDoubleFill } from "react-icons/ri";
import jobs from "./index/Jobs.json";
import { JobDetails } from "./Jobdetails";

export const FindJobs = () => {
  const navigate = useNavigate();
  const { page, id } = useParams();
  const { userData, logoutWeb3, setJoin } = useWeb3();
  const jobsPerPage = 5;
  const currentPage = Number(page);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);

  useEffect(() => {
    if (id) {
      setSelectedJobIndex(Number(id));
    }
  }, [id]);

  const handlePageChange = (pageNum) => {
    window.location.href = `/find-jobs/${pageNum}`;
  };

  const handleJobClick = (index) => {
    const absoluteIndex = (currentPage - 1) * jobsPerPage + index;
    navigate(`job/${absoluteIndex}`);
    setSelectedJobIndex(absoluteIndex);
  };

  const jobsToDisplay = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <main>
      <Nav
        logoutWeb3={logoutWeb3}
        userData={userData}
        handleJoinButtonClick={setJoin}
      />
      <header className="w-full h-full flex flex-row">
        <div
          className={`Jobs w-full flex flex-col gap-3 items-center h-auto p-16 ${
            selectedJobIndex !== null ? "w-[40vw]" : ""
          } transition-all duration-300`}
        >
          <h1 className="text-4xl font-bold text-white">Jobs</h1>
          {jobsToDisplay.map((job, index) => (
            <div
              key={index}
              onClick={() => handleJobClick(index)}
              className={`relative flex flex-row mt-16 items-center p-3 rounded-2xl cursor-pointer transform transition-transform duration-300 hover:scale-105 w-[33vw] ${
                selectedJobIndex === (currentPage - 1) * jobsPerPage + index
                  ? "bg-blue-100"
                  : "bg-white"
              }`}
            >
              <div>
                <div className="flex flex-row items-start gap-3">
                  <img
                    draggable={false}
                    className="Profile-co-worker w-10 h-10 rounded-full"
                    src="https://www.creativefabrica.com/wp-content/uploads/2023/09/05/Nature-wallpaper-Graphics-78543985-1.jpg"
                  />
                  <div className="w-full flex flex-col items-start">
                    <h1 className="w-full text-lg font-medium">{job.title}</h1>
                    <p className="text-sm font-normal">{job.details}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-5 mt-2">
                  <CiStar className="cursor-pointer ml-2" size={26} />
                  <p className="mt-5">{job.time}</p>
                </div>
              </div>
              <div className="ml-auto pr-3 items-end">
                <IoIosArrowForward size={20} />
              </div>
              <div className="absolute right-5 top-20">
                <p>{job.date}</p>
              </div>
            </div>
          ))}

          <div className="flex flex-row gap-2 mt-5">
            {/* Previous Button */}
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-2 py-2 rounded-full bg-white text-black border border-gray-400"
              >
                <RiArrowLeftDoubleFill />
              </button>
            )}

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-full ${
                  currentPage === i + 1
                    ? "bg-[#005e40] text-white"
                    : "bg-white text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-2 py-2 rounded-full bg-white text-black border border-gray-400"
              >
                <RiArrowRightDoubleLine />
              </button>
            )}
          </div>
        </div>

        {selectedJobIndex !== null && (
          <JobDetails jobs={jobs} selectedJobIndex={selectedJobIndex} />
        )}
      </header>
    </main>
  );
};
