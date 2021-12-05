import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import background from "./assets/bg.webp";

ReactDOM.render(
  <React.StrictMode>
    <div className="wrapper" style={{ backgroundImage: `url(${background})` }} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
