import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './components/Home.jsx';
import About from './components/About';
import Projects from './components/Projects.jsx';

import './styles/main.scss';


function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
    </Routes>
  </Router>
  );
}

export default App;
