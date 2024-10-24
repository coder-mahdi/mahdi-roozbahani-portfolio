import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';
import TypewriterText from './TypewriterText.jsx'; 
import '../styles/Contact.scss'; 

function Contact() {
  const [contactData, setContactData] = useState(null); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/data/contactData.json')
      .then((response) => response.json())
      .then((data) => {
        setContactData(data);
      })
      .catch((error) => console.error('Error loading contact data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://mahdiroozbahani.com/save_message.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name,
        email,
        message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setSubmitted(true);
        // پاک کردن مقادیر ورودی پس از ارسال موفقیت‌آمیز
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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

        <div className="contact-form-wrapper">
          {submitted && (
            <div className="form-success">
              {contactData.successMessage || "Your message was successfully sent!"}
            </div>
          )}
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{contactData.formLabels.name}</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{contactData.formLabels.email}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{contactData.formLabels.message}</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              {contactData.formLabels.submit}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
