import React, { useEffect, useState } from 'react';
import AnimatedText from './AnimatedText.'; 

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
    <div className="home-container">
      <AnimatedText initialMessage={initialMessage} finalMessage={finalMessage} duration={400} />

      <p className="welcome-message">{welcomeMessage}</p>
    </div>
  );
}

export default Home;
