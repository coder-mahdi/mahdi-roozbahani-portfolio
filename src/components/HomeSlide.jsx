import React, { useState, useEffect } from 'react';
import '../styles/HomeSlide.scss';

function HomeSlide() {
  const [slides, setSlides] = useState([]); 
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('/data/slideData.json')
      .then((response) => response.json())
      .then((data) => setSlides(data.slides))
      .catch((error) => console.error('Error loading slide data:', error));
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval); 
  }, [slides.length]);


  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="slide-container">
      {slides.length > 0 && (
        <>
          <div className="slide" key={slides[currentSlide].id}>
            <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
            <div className="slide-overlay">
              <p>{slides[currentSlide].text}</p>
              <a href={slides[currentSlide].link}>Read more</a>
            </div>
          </div>



          <button className="prev-button" onClick={prevSlide}>
            Previous
          </button>
          <button className="next-button" onClick={nextSlide}>
            Next
          </button>
        </>
      )}
    </div>
  );
}

export default HomeSlide;
