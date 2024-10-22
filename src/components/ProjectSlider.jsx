import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Projects.scss'; 

function ProjectSlider() {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
  
   
    useEffect(() => {
      fetch('/data/projectsData.json')
        .then((response) => response.json())
        .then((data) => setProjects(data.projects))
        .catch((error) => console.error('Error loading project data:', error));
    }, []);
  
 
    useEffect(() => {
      if (autoPlay) {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
          );
        }, 5000);
  
        return () => clearInterval(interval); 
      }
    }, [autoPlay, currentIndex, projects.length]);
  
  
    const goToSlide = (index) => {
      setCurrentIndex(index);
      setAutoPlay(false); 
    };
  
    
    const handleMouseEnter = () => {
      setAutoPlay(false);
    };
  
    const handleMouseLeave = () => {
      setAutoPlay(true); 
    };
  
    if (projects.length === 0) {
      return <div>Loading...</div>; 
    }
  
    return (
      <div
        className="project-slider"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="slider-wrapper"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div key={index} className="slide">
              <img
                src={project.image}
                alt={project.title}
                className="slide-image"
              />
              <div className="slide-content">
                <h2>{project.title}</h2>
                <p>{project.shortDescription}</p>


                <p>
                <Link to={`/singleproject/${project.id}`} className="learn-more-btn">
                Learn More
                </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
  

        <div className="navigation-dots">
          {projects.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    );
  }
  
  export default ProjectSlider;