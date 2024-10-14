import React, { useEffect, useState, useRef } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import Tabs from './Tabs.jsx';
// import '../styles/About.scss';
import { motion } from "framer-motion";
import { useFollowPointer } from "./useFollowPointer";
import { Link } from 'react-router-dom';


function Projects() {
  const [helloText, setHelloMessage] = useState("");
  const [accordionData, setAccordionData] = useState([]); // برای نگهداری داده‌های اکاردیون
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);


  const buttonsData = [
    { title: "Projects", link: "/projects" }
  ]

  useEffect(() => {
    fetch('/data/projectsData.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHelloMessage(data.helloMessage);
      })
      .catch((error) => console.error('Error loading about data:', error));
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <motion.div style={{ x, y }} ref={ref} className="circle-pointer"></motion.div>

        <div className="content-area">
          <div className="text-slide-container">
            <div className="animated-text">
              <div className="hello-text">{helloText}</div>
            </div>
          </div>
    
        </div>

        <div className="buttons-wrapper">
  {buttonsData.map((button, index) => (
    <Link key={index} to={button.link} className="custom-button">
      <span className="key-animation">{button.title}</span>
    </Link>
  ))}
</div>

        <Sidebar />
        <Tabs />
        <Footer />
      </div>
    </div>
  );
}

export default Projects;
