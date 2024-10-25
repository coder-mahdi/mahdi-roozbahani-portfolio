import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Projects.scss'; 

function ProjectSlider() {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Variables for touch events
  let touchStartX = 0;
  let touchEndX = 0;

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

  // Handle swipe start
  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  // Handle swipe move (optional, if needed)
  const handleTouchMove = (e) => {
    touchEndX = e.changedTouches[0].screenX;
  };

  // Handle swipe end
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left (next slide)
      setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
      setAutoPlay(false);
    }

    if (touchStartX - touchEndX < -50) {
      // Swipe right (previous slide)
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
      setAutoPlay(false);
    }
  };

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

  // Add keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
      setAutoPlay(false);
    } else if (e.key === 'ArrowLeft') {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
      setAutoPlay(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, projects.length]);

  if (projects.length === 0) {
    return <p>Loading...</p>; 
  }

  return (
    <section
      className="project-slider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {projects.map((project, index) => (
          <article key={index} className="slide">
            <img
              src={project.image}
              alt={`Image of ${project.title}`} // Providing meaningful alt text
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
          </article>
        ))}
      </div>

      <nav className="navigation-dots" aria-label="Slider Navigation">
        {projects.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            role="button"
            aria-label={`Go to slide ${index + 1}`}
          ></span>
        ))}
      </nav>
    </section>
  );
}

export default ProjectSlider;
