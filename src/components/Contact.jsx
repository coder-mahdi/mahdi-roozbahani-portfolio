import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';
import TypewriterText from './TypewriterText.jsx'; 
import '../styles/Contact.scss'; 

function Contact() {
  const [contactData, setContactData] = useState(null); 

  useEffect(() => {
    fetch('/data/contactData.json')
      .then((response) => response.json())
      .then((data) => {
        setContactData(data);
      })
      .catch((error) => console.error('Error loading contact data:', error));
  }, []);

  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout helloText={contactData.helloMessage} buttonsData={contactData.buttons}>
      <div className="conten-main">
        <div className="welcome-message-wrapper">
          <TypewriterText text={contactData.welcomeMessage} /> 
          <div className="email-button-wrapper">
            <a href="mailto:hello@mahdiroozbahani.com" className="email-button">
              Send Email
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
