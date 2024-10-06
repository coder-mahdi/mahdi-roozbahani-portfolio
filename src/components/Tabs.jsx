import React, { useState, useEffect } from 'react';
import '../styles/Tabs.scss';

function Tabs() {
  const [tabsData, setTabsData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isClicked, setIsClicked] = useState(false); 

  useEffect(() => {
    fetch('/data/tabsData.json')
      .then((response) => response.json())
      .then((data) => setTabsData(data.tabs))
      .catch((error) => console.error('Error loading tabs data:', error));
  }, []);

  // پخش صدای کلیک تب
  const playSound = () => {
    const audio = new Audio('../audio/tabs-sound.mp3');
    audio.play();
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    setIsClicked(true);
    playSound(); 
  };

  // تابع برای بستن تب‌ها و بازگشت به حالت اولیه
  const resetTabs = () => {
    setActiveTab(null);
    setIsClicked(false);
  };

  return (
    <div className="tabs-wrapper" onClick={resetTabs}> {/* کلیک در هر جای صفحه برای بازگشت به حالت اولیه */}
      <div className={`overlay ${activeTab !== null ? 'show' : ''}`}></div> {/* لایه تیره */}

      <div className="tabs-container" onClick={(e) => e.stopPropagation()}> {/* جلوگیری از بستن تب در صورت کلیک روی خود تب */}
        {/* دکمه‌های تب‌ها */}
        <div className="tabs-buttons">
          {tabsData.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${activeTab === index ? 'hidden' : ''} ${isClicked && activeTab === index ? 'clicked' : ''}`} 
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* محتوای تب‌ها */}
        <div className="tabs-content">
          {tabsData.map((tab, index) => (
            activeTab === index && (
              <div key={index} className={`tab-content ${activeTab === index ? 'show' : ''}`}>
              <h2>{tab.title}</h2>
              <p>{tab.content}</p>
            </div>
            
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tabs;
