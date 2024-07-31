import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/member/login/Login';
import Signup from './components/member/signup/Signup';
import Update from './components/member/update/Update';
import Admin from './components/member/admin/Admin';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>           
                <Route path="/" element={<HomePage />} />     
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/update" element={<Update />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
  );
}

export default App;
