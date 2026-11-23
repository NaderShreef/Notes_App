import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
//pages
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
const API_URL = "http://localhost:5000/api/notes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
