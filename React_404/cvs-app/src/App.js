import './App.css';
import NoticeList from './components/notice/NoticeList';
import RegisterForm from './components/notice/RegisterForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/notice/list" />} /> {/* 기본 경로를 /notice/list로 리디렉션 */}
        <Route path="/notice/list" element={<NoticeList />} />
        <Route path="/notice/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
