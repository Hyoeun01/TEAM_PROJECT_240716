import logo from "./logo.svg";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Product from "./productAdim/page/Product";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="productAdmin" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
