import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Accordion = ({ data }) => {
  const [accordionItems, setAccordionItems] = useState(
    data.map(item => ({ title: item.title, content: item.content, open: false }))
  );

  const handleClick = (index) => {
    setAccordionItems(prevItems =>
      prevItems.map((item, i) => ({
        ...item,
        open: i === index ? !item.open : item.open
      }))
    );
  };

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    } else if (typeof content === 'object') {
      return (
        <div>
          {Object.keys(content).map((category, idx) => (
            <div key={idx}>
              <h3>{category}</h3>
              <ul>
                {content[category].map((item, idx2) => (
                  <li key={idx2}>
                    {item.logo && <img src={item.logo} alt={item.name} />}
                    {item.name || item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="accordion">
      {accordionItems.map((item, index) => (
        <div key={index}>
          <h2 className="title" onClick={() => handleClick(index)}>
            <div className="arrow-wrapper">
              <FontAwesomeIcon icon={faAngleDown} className={item.open ? "fa-rotate-180" : ""} />
            </div>
            <span className="title-text">{item.title}</span>
          </h2>
          <div className={item.open ? "content content-open" : "content"}>
            <div className={item.open ? "content-text content-text-open" : "content-text"}>
              {renderContent(item.content)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
