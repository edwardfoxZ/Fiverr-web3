import "./App.css";
import { Join } from "./components/Join";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Main
        logoutWeb3={logoutWeb3}
        isJoinActive={isJoinActive}
        setJoin={setJoin}
        userData={userData} // Pass userData to Main
        userAddress={userAddress} // Pass userAddress to Main
        userDataLoading={userDataLoading} // Pass loading state
        userDataError={userDataError} // Pass error state
      /> */}
      <Outlet />
    </>
  );
}

export default App;
