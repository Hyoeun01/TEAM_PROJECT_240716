import React from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Convenience Store Products</h1>
      </header>
      <ProductList />
    </div>
  );
}

export default App;
