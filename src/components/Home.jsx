import React, { useEffect, useState, useRef } from 'react';
import AnimatedText from './AnimatedText.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import Tabs from './Tabs.jsx';
import '../styles/Home.scss';
import { motion } from "framer-motion";
import { useFollowPointer } from "./useFollowPointer";
import TypewriterText from './TypewriterText.jsx';

function Home() {
  const [helloText, setHelloMessage] = useState("");
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [buttonsData, setButtonsData] = useState([]); 

  const ref = useRef(null); // مرجع برای المنت
  const { x, y } = useFollowPointer(ref); // استفاده از هوک
  

  useEffect(() => {
    fetch('/data/homeData.json')
      .then((response) => response.json())
      .then((data) => {
        setHelloMessage(data.helloMessage[0].part1);
        setFirstText(data.helloMessage[0].part2);
        setSecondText(data.helloMessage[0].part3);
        setWelcomeMessage(data.welcomeMessage); 
        setButtonsData(data.buttons); 
      })
      .catch((error) => console.error('Error loading home data:', error));
  }, []);

  return (
    <div className="home-page">
      <Header />
  
      <div className="main-content">

      <motion.div style={{ x, y }} ref={ref} className="circle-pointer">
      </motion.div>

        <div className="content-area">

        <div className="text-slide-container">
  <div className="animated-text">
    <div className="hello-text">{helloText}</div> {/* پیام ثابت */}
    <section className="animation">
      <div className="second">
        <div>{firstText}</div> {/* پیام دوم */}
      </div>
      <div className="third">
        <div>{secondText}</div> {/* پیام سوم */}
      </div>
    </section>
  </div>
</div>





        </div>
  
        <div className="welcome-message-wrapper">
        <TypewriterText text={welcomeMessage} />

        </div>
  
        <div className="buttons-wrapper">
  {buttonsData.map((button, index) => (
    <a key={index} href={button.link} className="custom-button">
      <span className="key-animation">{button.title}</span> {/* متن دکمه */}
    </a>
  ))}
</div>

  
      </div>
  
      <Sidebar />
      <Tabs />
      <Footer />
    </div>
  );
 }  

export default Home;
