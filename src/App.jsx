import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './components/Home.jsx';
import About from './components/About';
import './styles/main.scss';


function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />


 
    </Routes>
  </Router>
  );
}

export default App;
