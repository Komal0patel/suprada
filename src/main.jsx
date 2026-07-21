import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

window.addEventListener('error', (e) => {
  const div = document.createElement('div');
  div.style = 'position:fixed;top:0;left:0;z-index:9999;background:red;color:white;padding:20px;font-size:20px;';
  div.innerText = 'ERROR: ' + e.message + '\n' + e.filename + ':' + e.lineno;
  document.body.appendChild(div);
});

const originalConsoleError = console.error;
console.error = (...args) => {
  originalConsoleError(...args);
  const div = document.createElement('div');
  div.style = 'position:fixed;top:100px;left:0;z-index:9999;background:orange;color:white;padding:20px;font-size:16px;max-width:100vw;word-wrap:break-word;';
  div.innerText = 'REACT ERROR: ' + args.map(a => (typeof a === 'object' ? (a.message || JSON.stringify(a)) : String(a))).join(' ');
  document.body.appendChild(div);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
