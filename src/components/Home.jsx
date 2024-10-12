import React, { useEffect, useState } from 'react';
import AnimatedText from './AnimatedText.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import Tabs from './Tabs.jsx';
import '../styles/Home.scss';

function Home() {
  const [finalMessage, setFinalMessage] = useState(""); 
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [buttonsData, setButtonsData] = useState([]); 

  useEffect(() => {
    fetch('/data/homeData.json')
      .then((response) => response.json())
      .then((data) => {
        setFinalMessage(data.helloMessage); 
        setWelcomeMessage(data.welcomeMessage); 
        setButtonsData(data.buttons); 
      })
      .catch((error) => console.error('Error loading home data:', error));
  }, []);

  return (
    <div className="home-page">
      <Header />
  
      <div className="main-content">
        
        <div className="content-area">
          <div className="text-slide-container"> 
            <AnimatedText finalMessage={finalMessage} duration={400} />
          </div>
        </div>
  
        <div className="welcome-message-wrapper">
          <p className="welcome-message">{welcomeMessage}</p>
        </div>
  
        <div className="buttons-wrapper">
          {buttonsData.map((button, index) => (
            <a key={index} href={button.link} className="custom-button">
              {button.title}
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
