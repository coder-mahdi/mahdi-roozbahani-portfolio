import React, { useEffect, useState } from 'react';
import AnimatedText from './AnimatedText.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import Tabs from './Tabs.jsx';
import '../styles/Home.scss';



function Home() {
  const [initialMessage, setInitialMessage] = useState(""); 
  const [finalMessage, setFinalMessage] = useState(""); 
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    fetch('/data/homeData.json')
      .then((response) => response.json())
      .then((data) => {
        setInitialMessage(data.initialMessage); 
        setFinalMessage(data.helloMessage); 
        setWelcomeMessage(data.welcomeMessage); 
      })
      .catch((error) => console.error('Error loading home data:', error));
  }, []);

 
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar /> 
        <div className="content-area">
          <AnimatedText initialMessage={initialMessage} finalMessage={finalMessage} duration={400} />
          <p className="welcome-message">{welcomeMessage}</p>
        </div>
        <Tabs /> 
      </div>
      <Footer />
    </div>
  );
}


export default Home;
