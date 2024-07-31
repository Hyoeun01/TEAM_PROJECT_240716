import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
// Seong Eon_ADD
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
ReactDOM.render(<App />, document.getElementById('root'));
