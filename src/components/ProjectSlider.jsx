import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Projects.scss'; 

function ProjectSlider() {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
  
    // بارگذاری داده‌ها از فایل JSON
    useEffect(() => {
      fetch('/data/projectsData.json')
        .then((response) => response.json())
        .then((data) => setProjects(data.projects))
        .catch((error) => console.error('Error loading project data:', error));
    }, []);
  
    // پخش خودکار اسلایدر
    useEffect(() => {
      if (autoPlay) {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000); // هر 3 ثانیه یک اسلاید جابجا شود
  
        return () => clearInterval(interval); // پاک کردن تایمر وقتی کامپوننت از بین برود
      }
    }, [autoPlay, currentIndex, projects.length]);
  
    // کلیک روی دایره‌ها برای جابجایی به اسلاید خاص
    const goToSlide = (index) => {
      setCurrentIndex(index);
      setAutoPlay(false); // اگر کاربر دایره‌ای را کلیک کند، پخش خودکار متوقف می‌شود
    };
  
    // توقف پخش خودکار هنگام هاور کردن
    const handleMouseEnter = () => {
      setAutoPlay(false); // وقتی کاربر ماوس را روی اسلایدر می‌برد، پخش خودکار متوقف شود
    };
  
    const handleMouseLeave = () => {
      setAutoPlay(true); // وقتی کاربر ماوس را از اسلایدر خارج می‌کند، پخش خودکار دوباره شروع شود
    };
  
    if (projects.length === 0) {
      return <div>Loading...</div>; // نمایش پیام لودینگ تا زمان بارگذاری داده‌ها
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
                <h3>{project.title}</h3>
                <p>{project.description}</p>
  
                <Link to={`/singleproject/${project.id}`} className="learn-more-btn">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
  
        {/* دایره‌های ناوبری */}
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