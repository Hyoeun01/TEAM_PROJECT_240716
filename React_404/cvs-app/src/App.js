import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/member/login/Login';
import Signup from './components/member/signup/Signup';
import Update from './components/member/update/Update';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import InquiryBoard from './components/InquiryBoard';
import CustomNavbar from './components/Navbar';


function App() {
    return (
        <Router>
            <CustomNavbar />
            <Routes>           
                <Route path="/" element={<HomePage />} />     
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/update" element={<Update />} />
                <Route path="/api/inquiries" element={<InquiryBoard />} />
            </Routes>
        </Router>
  );
}

export default App;
