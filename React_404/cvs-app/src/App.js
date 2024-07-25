import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/member/login/Login';
import Signup from './components/member/signup/Signup';
import Update from './components/member/update/Update';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ReadPage from './components/notice/ReadPage';
import NoticeList from './components/notice/NoticeList';
import ModifyForm from './components/notice/ModifyForm';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>  
              
            <Route path="/notice/list" element={<NoticeList />} />         
                <Route path="/" element={<HomePage />} />     
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/update" element={<Update />} />
                <Route path="/notice/read/:bno" element={<ReadPage />} /> {/* 공지사항 읽기 페이지 */}
                <Route path="/notice/modify/:bno" element={<ModifyForm />} /> {/* 공지사항 읽기 페이지 */}
            </Routes>
        </Router>
  );
}

export default App;