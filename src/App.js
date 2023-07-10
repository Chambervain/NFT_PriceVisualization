import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import { searchNFTs } from "./utils";

const handleButtonClick = () => {
  searchNFTs("car");
};

function App() {
  return (
    <div className="App">
      <Button onClick={handleButtonClick}>Test</Button>
    </div>
  );
}

export default App;
