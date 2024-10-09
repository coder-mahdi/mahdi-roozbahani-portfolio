import React, { useState, useEffect } from 'react';
import '../styles/Header.scss'; // لینک به فایل SCSS برای استایل‌ها

function Header() {
  const [headerData, setHeaderData] = useState({ title: "", navLinks: [] });

  useEffect(() => {
    fetch('/data/headerData.json')
      .then(response => response.json())
      .then(data => setHeaderData(data));
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        {headerData.logo && (
          <img
            src={import.meta.env.BASE_URL + headerData.logo}
            alt="Logo"
            className="logo"
          />
        )}
      </div>

      <nav className="nav-menu">
        {headerData.navLinks.map((link, index) => (
          <a key={index} href={link.link} className="nav-link">
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
