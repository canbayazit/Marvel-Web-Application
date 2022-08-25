import { Route, Routes } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./Context/DataContext";
import Detail from "./Pages/Detail/Detail";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
