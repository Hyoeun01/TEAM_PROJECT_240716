import './App.css';
import NoticeList from './components/notice/NoticeList';
import RegisterForm from './components/notice/RegisterForm';
import ModifyForm from './components/notice/ModifyForm';
import ReadPage from './components/notice/ReadPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/notice/list" />} /> {/* 기본 경로 리디렉션 */}
        <Route path="/notice/list" element={<NoticeList />} />
        <Route path="/notice/register" element={<RegisterForm />} />
        <Route path="/notice/modify/:bno" element={<ModifyForm />} /> {/* 수정 경로 추가 */}
        <Route path="/notice/read/:bno" element={<ReadPage />} /> {/* 읽기 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
