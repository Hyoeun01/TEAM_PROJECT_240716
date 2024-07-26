import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReviewSave from './pages/review/ReviewSave';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './pages/review/List';
import Read from './pages/review/Read';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/review/add' element={<ReviewSave />}></Route>
          <Route path='/review/list' element={<List />}></Route>
          <Route path='/review/read/:rno' element={<Read />}></Route>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
