import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';
import TypewriterText from './TypewriterText.jsx'; // استفاده از TypewriterText
import '../styles/Contact.scss'; // استایل‌های صفحه کانتکت

function Contact() {
  const [contactData, setContactData] = useState(null); // داده‌های JSON
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // فراخوانی داده‌های JSON از فایل contactData.json
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

    fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }), // ارسال اطلاعات فرم
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setSubmitted(true); // پیام موفقیت بعد از ارسال فرم
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // بررسی اینکه آیا داده‌ها هنوز بارگذاری نشده‌اند
  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout helloText={contactData.helloMessage} buttonsData={contactData.buttons}>
      <div className="content-area">
        {/* نمایش پیام خوش‌آمدگویی با تایپ‌رایت */}
        <div className="welcome-message-wrapper">
          <TypewriterText text={contactData.welcomeMessage} /> {/* پیام خوش‌آمدگویی */}
        </div>

        {/* فرم تماس */}
        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="form-success">
              {contactData.successMessage} {/* پیام موفقیت از JSON */}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
