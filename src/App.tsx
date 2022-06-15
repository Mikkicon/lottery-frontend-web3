import "./App.css";
import Slot from "./components/Slot";
import "./polyfill";
import web3 from "./web3";

function App() {
  return (
    <div className="App">
      <Slot />
    </div>
  );
}

export default App;
