import "./App.css";
// import { StopWatchBtn } from "./pages/StopWatchBtn";
import { Timer } from "./pages/Timer";

function App() {
  return (
    <div className="main-section">
      <div className="center-screen">
        <div className="clock-holder">
          <div className="stopwatch">
            <Timer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
