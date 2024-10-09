import React, { useEffect, useState } from 'react';
import AnimatedText from './AnimatedText.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import Tabs from './Tabs.jsx';
import HomeSlide from './HomeSlide.jsx';
import '../styles/Home.scss';

function Home() {
  const [finalMessage, setFinalMessage] = useState(""); 
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    fetch('/data/homeData.json')
      .then((response) => response.json())
      .then((data) => {
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
          <div className="text-slide-container"> {/* قرار دادن انیمیشن و اسلاید در یک div */}
            <AnimatedText finalMessage={finalMessage} duration={400} />
            <div className="home-slide-wrapper">
              <HomeSlide />
            </div>
          </div>
          <div className="welcome-message-wrapper"> {/* پیام خوش‌آمدگویی در زیر متن و اسلاید */}
            <p className="welcome-message">{welcomeMessage}</p>
          </div>
        </div>
        <Tabs />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
