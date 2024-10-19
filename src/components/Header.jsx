// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// import '../styles/Header.scss'; 

// function Header() {
//   const [headerData, setHeaderData] = useState({ title: "", navLinks: [] });

//   useEffect(() => {
//     fetch('/data/headerData.json')
//       .then(response => response.json())
//       .then(data => setHeaderData(data));
//   }, []);

//   return (
//     <header className="header">
//    <div className="logo-container">
//   {headerData.logo && (
//     <Link to="/">
//       <img
//         src={import.meta.env.BASE_URL + headerData.logo}
//         alt="Logo"
//         className="logo"
//       />
//     </Link>
//   )}
// </div>

//       <nav className="nav-menu">
//         {headerData.navLinks.map((link, index) => (
//           <a key={index} href={link.link} className="nav-link">
//             {link.name}
//           </a>
//         ))}
//       </nav>
//     </header>
//   );
// }

// export default Header;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss'; 

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
          <Link to="/">
            <img
              src={import.meta.env.BASE_URL + headerData.logo}
              alt="Logo"
              className="logo"
            />
          </Link>
        )}
      </div>

      {/* منوی دسکتاپ */}
      <nav className="nav-menu desktop-nav">
        {headerData.navLinks.map((link, index) => (
        <Link key={index} to={link.link} className="nav-link">
        {link.icon ? (
          <img src={link.icon} alt="nav icon" className="nav-icon" />
        ) : (
          <span>{link.name}</span>
        )}
      </Link>
        ))}
      </nav>

      {/* منوی موبایل */}
      <nav className="nav-menu mobile-nav">
        {headerData.navLinks.map((link, index) => (
          <Link key={index} to={link.link} className="nav-link">
            {link.icon ? (
              <img src={link.icon} alt="nav icon" className="nav-icon" />
            ) : (
              <span>{link.name}</span>
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
