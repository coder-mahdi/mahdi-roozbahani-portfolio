import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout.jsx';
import '../styles/SingleProject.scss'; 

function SingleProject() {
  const { projectId } = useParams(); // دریافت ID پروژه از URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    // بارگذاری اطلاعات پروژه از فایل JSON
    fetch('/data/projectsData.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProject = data.projects.find((proj) => proj.id === parseInt(projectId));
        setProject(foundProject);
      })
      .catch((error) => console.error('Error loading project data:', error));
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const buttonsData = [
    { title: "Go Back", link: "/projects" } 
  ];

  return (
    <Layout helloText={project.title} buttonsData={buttonsData}>
      <div className="single-project">
        <h2>{project.title}</h2>
        <img src={project.image} alt={project.title} className="project-image" />
        <p>{project.detailedDescription}</p>
        <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="visit-site-btn">
          Visit Project Website
        </a>
      </div>
    </Layout>
  );
}

export default SingleProject;