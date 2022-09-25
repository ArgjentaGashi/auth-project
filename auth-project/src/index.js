import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SecuredApp from './SecuredApp';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path="/profile" element={<SecuredApp/>}></Route>
            <Route path="/profile/:fromHomepage" element={<SecuredApp/>}></Route>
            <Route path="/" element={<App />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
