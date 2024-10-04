import React from 'react';
import Header from './components/Header.'; 
import Sidebar from './components/sidebar.';
import Footer from './components/Footer.';
import Home from './components/Home.';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <Footer/>
      <Home/>
    </div>
  );
}

export default App;
