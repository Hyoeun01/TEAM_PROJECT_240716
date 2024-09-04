import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18에서 사용하는 모듈
import './styles.css';
import App from './App';
// Seong Eon_ADD
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// ReactDOM.createRoot 사용하여 앱을 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
