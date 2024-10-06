import React, { useState, useEffect } from 'react';


function Header() {
  const [headerData, setheaderData] = useState({ title: "", navLinks: [] });
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    fetch('/data/headerData.json')
      .then(response => response.json())
      .then(data => setheaderData(data));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <header className="header">
      {headerData.logo && (
        <img src={import.meta.env.BASE_URL + headerData.logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
      )}

      <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}> 
        {headerData.navLinks.map((link, index) => (
          <a key={index} href={link.link}>
            {link.name}
          </a>
        ))}
      </nav>


      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
}

export default Header;
