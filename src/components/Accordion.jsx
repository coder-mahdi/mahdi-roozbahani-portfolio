import React, { useState } from 'react';

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

  return (
    <div className="accordion">
      {accordionItems.map((item, index) => (
        <div key={index}>
          <div className="title" onClick={() => handleClick(index)}>
            <div className="arrow-wrapper">
              <i className={item.open ? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"}></i>
            </div>
            <span className="title-text">{item.title}</span>
          </div>
          <div className={item.open ? "content content-open" : "content"}>
            <div className={item.open ? "content-text content-text-open" : "content-text"}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
