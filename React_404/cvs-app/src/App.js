import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/member/login/Login';
import Signup from './components/member/signup/Signup';
import Update from './components/member/update/Update';
import Admin from './components/member/admin/Admin';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import InquiryBoard from './components/InquiryBoard';
import CustomNavbar from './components/Navbar/Navbar';
import Home from "./components/member/Home";
import logo from "./logo.svg";
import "./App.css";
import Product from "./productAdim/page/Product";
import ProductView from "./productAdim/page/ProductView";
import ProductAdd from "./productAdim/page/ProductAdd";
import ProductEdit from "./productAdim/page/ProductEdit";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>           
                <Route path="/" element={<HomePage />} />     
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/update" element={<Update />} />
                <Route path="/api/inquiries" element={<InquiryBoard />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
  );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update" element={<Update />} />
        <Route path="/productAdmin" element={<Product />} />
        <Route path="/productView/:id" element={<ProductView />} />
        <Route path="/productAdd" element={<ProductAdd />} />
        <Route path="/productEdit/:id" element={<ProductEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
