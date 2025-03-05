import React from "react";
import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";

export const Join = ({
  setJoin,
  userData,
  userAddress,
  userDataLoading,
  userDataError,
  initWeb3,
}) => {
  const handleCloseJoinPage = () => {
    setJoin(false);
  };

  return (
    <>
      <section className="flex mx-auto w-[36vw] h-[50vh] bg-[#ffffff] rounded-2xl">
        <div className="Join-bg-left rounded-l-2xl flex">
          <div className="Join-left-container flex flex-col ml-12 mt-20">
            <h1 className="text-white font-bold text-3xl">
              Success starts here
            </h1>
            <section className="mt-10 flex flex-col gap-3">
              <p className="flex flex-row gap-1 items-start text-xl text-white">
                <TiTick />
                Over 700 categories
              </p>
              <p className="flex flex-row gap-1 items-start text-xl text-white">
                <TiTick />
                Quality work done faster
              </p>
              <p className="flex flex-row gap-1 items-start text-xl text-white">
                <TiTick />
                Access to talent and businesses across the globe
              </p>
            </section>
          </div>
        </div>
        <div className="Join-right w-[50%] relative p-10">
          <button
            className="absolute top-4 right-4"
            onClick={handleCloseJoinPage}
          >
            <IoMdClose color="red" size={23} />
          </button>
          <div className="Join-right-container flex">
            <h1 className="text-3xl mx-auto mt-20">Connect to your wallet</h1>
          </div>
          {!userData?.user?.address ? (
            <button
              onClick={initWeb3}
              className="flex flex-row mx-auto mt-20 items-center gap-1 text-white bg-[#222222] hover:bg-[#3a3a3a] px-6 py-3 rounded-xl"
            >
              <p className="text-xl">Metamask</p>
              <img
                className="w-6 h-6"
                src="https://freelogopng.com/images/all_img/1683020955metamask-icon-png.png"
              />
            </button>
          ) : (
            <>
              <p className="flex flex-col items-center mt-14 gap-2 text-sm text-green-700">
                Connected:
                <span className="text-xs font-mono">
                  {userData?.user?.address}
                </span>
              </p>

              {userDataLoading && <p>Loading user data...</p>}
              {userDataError && <p>Error fetching user data!</p>}
            </>
          )}
          <footer className="flex-1 mt-60 text-[16px] font-normal text-gray-500">
            By joining, you agree to the Fiverr{" "}
            <a className="underline">Terms of Service</a> and to occasionally
            receive emails from us. Please read our{" "}
            <a className="underline">Privacy Policy</a> to learn how we use your
            personal data.
          </footer>
        </div>
      </section>
    </>
  );
};
