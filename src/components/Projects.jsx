import React, { useEffect, useState } from 'react';
import Layout from './Layout.jsx';
import ProjectSlider from './ProjectSlider'; 
import '../styles/Projects.scss'; 

function Projects() {
  const [helloText, setHelloMessage] = useState("");

  const buttonsData = [
    { title: "About", link: "/about" }
  ];

  useEffect(() => {
    fetch('/data/projectsData.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHelloMessage(data.helloMessage);
      })
      .catch((error) => console.error('Error loading project data:', error));
  }, []);

  return (
    <Layout helloText={helloText} buttonsData={buttonsData}>
      <ProjectSlider />
    </Layout>
  );
}

export default Projects;
