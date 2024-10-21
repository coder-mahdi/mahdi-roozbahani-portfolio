import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import Tabs from './Tabs.jsx';
import '../styles/Layout.scss'
import { motion } from 'framer-motion';
import { useFollowPointer } from './useFollowPointer';
import { Link } from 'react-router-dom';

function Layout({ children, helloText, buttonsData }) {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);
  const location = useLocation(); 

  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <motion.div style={{ x, y }} ref={ref} className="circle-pointer"></motion.div>

        <div className="content-area">
          {location.pathname !== '/' && (
            <div className="text-slide-container">
              <div className="animated-text">
                <div className="hello-text">{helloText}</div>
              </div>
            </div>
          )}

          {children}


          <Sidebar />
          <Tabs />
        </div>
          <h3 className="buttons-wrapper">
            {buttonsData.map((button, index) => (
              <Link key={index} to={button.link} className="custom-button">
                <span className="key-animation">{button.title}</span>
              </Link>
            ))}
          </h3>

      </main>
          <Footer />

    </div>
  );
}

export default Layout;