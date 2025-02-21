import React from "react";
import { CiStar } from "react-icons/ci";

export const JobDetails = ({ jobs, selectedJobIndex }) => {
  if (selectedJobIndex === null) {
    return null;
  }

  const job = jobs[selectedJobIndex];

  return (
    <div
      className={`Jobs-details flex flex-col fixed right-0 ${
        selectedJobIndex === null ? "w-0" : "w-[55%]"
      } transition-opacity duration-500 delay-150 ease-in-out`}
    >
      <h1 className="text-5xl flex flex-row items-center font-bold mt-10">
        {job.title}
        <div className="ml-auto pr-5">
          <CiStar size={40} />
        </div>
      </h1>
      <div className="flex flex-col gap-5 mt-10 ml-5 items-start">
        <p>{job.company}</p>
        <p>{job.time}</p>
        <p>{job.price}</p>
      </div>
    </div>
  );
};
