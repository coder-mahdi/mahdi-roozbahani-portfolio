import React, { useState, useEffect } from 'react';

function Sidebar() {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    fetch('/data/sidebarData.json')
      .then(response => response.json())
      .then(data => setSocialLinks(data.socialLinks))
      .catch(error => console.error('Error loading sidebar data:', error));
  }, []);

  return (
    <aside className="sidebar">
      <ul>
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <div
                dangerouslySetInnerHTML={{ __html: link.icon }}
                style={{ width: "30px", height: "30px" }}
              />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
