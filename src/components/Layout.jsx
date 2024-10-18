import React, { useEffect, useState, useRef } from 'react';
import Accordion from './Accordion';
import Layout from './Layout.jsx';  // اضافه کردن Layout
import '../styles/About.scss';

function About() {
  const [helloText, setHelloMessage] = useState("");
  const [accordionData, setAccordionData] = useState([]);
  const ref = useRef(null);

  const buttonsData = [
    { title: "Projects", link: "/projects" }
  ];

  useEffect(() => {
    fetch('/data/aboutData.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHelloMessage(data.helloMessage);
        setAccordionData(data.tabs); 
      })
      .catch((error) => console.error('Error loading about data:', error));
  }, []);

  return (
    <Layout helloText={helloText} buttonsData={buttonsData}>
  
      <div className="content-area">
        {accordionData.length > 0 && <Accordion data={accordionData} />}
      </div>
    </Layout>
  );
}

export default About;
