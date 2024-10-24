import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout.jsx';
import '../styles/SingleProject.scss'; 

function SingleProject() {
  const { projectId } = useParams(); 
  const [project, setProject] = useState(null);
  const [buttonsData, setButtonsData] = useState([]);

  useEffect(() => {
    fetch('/data/projectsData.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProject = data.projects.find((proj) => proj.id === parseInt(projectId));
        setProject(foundProject);
      })
      .catch((error) => console.error('Error loading project data:', error));
  }, [projectId]);

  useEffect(() => {
    fetch('/data/singleProjectsData.json')
      .then((response) => response.json())
      .then((data) => {
        setButtonsData(data.buttons || []); 
      })
      .catch((error) => console.error('Error loading buttons data:', error));
  }, []);

  if (!project) {
    return <div>Loading...</div>;
  }

  const renderSections = (sections) => {
    return Object.keys(sections).map((sectionTitle, idx) => (
      <div key={idx} className="project-section">
        <h3>{sectionTitle}</h3>
        <ul>
          {sections[sectionTitle].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <Layout helloText={project.title} buttonsData={buttonsData}>
      <div className="single-project">
        <div className="project-image-wrapper">
          <img src={project.image} alt={project.title} className="project-image" />
          <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="visit-site-btn">
            Visit Project Website
          </a> 
        </div>

        <div className="project-content">
          <p>{project.detailedDescription.overview}</p>
          {renderSections(project.detailedDescription.sections)}
        </div>
      </div>
    </Layout>
  );
}

export default SingleProject;
