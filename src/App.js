import { Route, Routes } from "react-router-dom";
import "./App.css";
import Detail from "./Pages/Detail/Detail";
import Home from "./Pages/Home/Home";
import Particles from '../src/Components/Particle'
function App() {
  return (
    <div className="App">  
    <Particles/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>  
    </div>
  );
}

export default App;
