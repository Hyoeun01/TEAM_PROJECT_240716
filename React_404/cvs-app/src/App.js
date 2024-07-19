import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReviewSave from './commponents/ReviewSave';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/addReview' element={<ReviewSave />}></Route>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
