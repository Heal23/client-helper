// client-helper/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/create-account">Create Account</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/" exact element={<div>Welcome to the Financial Helper App</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


