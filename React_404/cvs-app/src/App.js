import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReviewSave from './commponents/ReviewSave';
import Home from './pages/review/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/review' element={<ReviewSave />}></Route>
          <Route path='/review/list' element={<Home />}></Route>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
