import React, { useState, useEffect } from 'react';

function Header() {
  const [headerData, setheaderData] = useState({ title: "", navLinks: [] });

  useEffect(() => {
    fetch('/data/headerData.json')
      .then(response => response.json())
      .then(data => setheaderData(data));
  }, []);

  return (
    <header>
       {headerData.logo && (
       <img src={import.meta.env.BASE_URL + headerData.logo} alt="Logo" style={{ width: "50px", height: "50px" }} />

      )}
      <nav>
        {headerData.navLinks.map((link, index) => (
          <a key={index} href={link.link}>
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
