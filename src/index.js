import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import SignUp from './SignUp';
import Poster from './Poster';


export default function AppRouting() {
  return ( //handles the redirects in the code
  <div>
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "mainPage" element = {<MainPage />} />
      <Route path = "signUp" element = {<SignUp />} />
      <Route path = "poster" element = {<Poster />} />
    </Routes>
  </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( //initial render
  <Router>
    <AppRouting />
  </Router>
);

reportWebVitals();
