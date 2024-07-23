import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/member/Home';
import Login from './components/member/login/Login';
import Signup from './components/member/signup/Signup';
import Update from './components/member/update/Update';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/update" element={<Update />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
