import './App.css';
import NoticeList from './components/notice/NoticeList';
import RegisterForm from './components/notice/RegisterForm';
import ModifyForm from './components/notice/ModifyForm';
import ReadPage from './components/notice/ReadPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './components/member/login/Login';
import Signup from './components/member/signup/Signup';
import Update from './components/member/update/Update';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/notice/list" element={<NoticeList />} />
        <Route path="/notice/register" element={<RegisterForm />} />
        <Route path="/notice/modify/:bno" element={<ModifyForm />} /> {/* 수정 경로 추가 */}
        <Route path="/notice/read/:bno" element={<ReadPage />} /> {/* 읽기 경로 추가 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/update" element={<Update />} />
          <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>

  );
}

export default App;
