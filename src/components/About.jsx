import React, { useEffect, useState, useRef } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import Tabs from './Tabs.jsx';
import '../styles/About.scss';
import { motion } from "framer-motion";
import { useFollowPointer } from "./useFollowPointer";
import Accordion from './Accordion'; // افزودن کامپوننت اکاردیون

function About() {
  const [helloText, setHelloMessage] = useState("");
  const [accordionData, setAccordionData] = useState([]); // برای نگهداری داده‌های اکاردیون
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  useEffect(() => {
    fetch('/data/aboutData.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHelloMessage(data.helloMessage);
        setAccordionData(data.tabs); // ذخیره داده‌های تب‌ها
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
          {accordionData.length > 0 && <Accordion data={accordionData} />}
        </div>

        <Sidebar />
        <Tabs />
        <Footer />
      </div>
    </div>
  );
}

export default About;
