import "./App.css";
import Slot from "./components/Slot";

function App() {
  // if (!window.ethereum) return <h1>Metamask required</h1>;
  return (
    <div className="App">
      <Slot />
    </div>
  );
}

export default App;
