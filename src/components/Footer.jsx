import React, { useState, useEffect } from 'react';

function Footer() {
  const [footerMessage, setfooterMessage] = useState("");

  useEffect(() => {
    fetch('/data/footerData.json')
      .then(response => response.json())
      .then(data => setfooterMessage(data.footerMessage))
      .catch(error => console.error('Error loading footer data:', error));
  }, []);

  return (
    <footer style={{ textAlign: "center", padding: "10px", }}>
      <p>{footerMessage}</p>
    </footer>
  );
}

export default Footer;
