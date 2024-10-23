
import React, { useEffect, useState } from 'react';
import Layout from './Layout.jsx';
import AnimatedText from './AnimatedText.jsx';
import TypewriterText from './TypewriterText.jsx';
import '../styles/Home.scss';

function Home() {
  const [helloText, setHelloMessage] = useState("");
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const buttonsData = [
    { title: "About", link: "/about" },
    { title: "Projects", link: "/projects" }
  ];
  
  useEffect(() => {
    fetch('/data/homeData.json')
      .then((response) => response.json())
      .then((data) => {
        setHelloMessage(data.helloMessage[0].part1);
        setFirstText(data.helloMessage[0].part2);
        setSecondText(data.helloMessage[0].part3);
        setWelcomeMessage(data.welcomeMessage);
      })
      .catch((error) => console.error('Error loading home data:', error));
  }, []);

  return (
    <Layout helloText={helloText} buttonsData={buttonsData}>
      <div className="content-area-home">
        <div className="text-slide-container">
          <h1 className="animated-text">
            <div className="hello-text">{helloText}</div> 
            <div className="animation">
              <div className="second">
                <div>{firstText}</div> 
              </div>
              <div className="third">
                <div>{secondText}</div>
              </div>
            </div>
          </h1>
        </div>

        <div className="welcome-message-wrapper">
          <TypewriterText text={welcomeMessage} />
        </div>
      </div>
    </Layout>
  );
}

export default Home;