import logo from "./logo.svg";
import "./App.css";
import { Nav } from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="w-full h-full pt-10 flex overflow-hidden">
        <div className="bg-preview-main flex mx-auto">
          <p className="w-80 flex mx-auto mt-16 text-white font-semibold text-3xl">
            Scale your professional workforce with <p className="inline-block">freelancer</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
