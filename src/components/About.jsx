import React, { useEffect, useState } from 'react';
import Layout from './Layout.jsx';
import Accordion from './Accordion'; 
import '../styles/About.scss';

function About() {
  const [helloText, setHelloMessage] = useState("");
  const [accordionData, setAccordionData] = useState([]); 

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
      {accordionData.length > 0 && <Accordion data={accordionData} />}
    </Layout>
  );
}

export default About;
