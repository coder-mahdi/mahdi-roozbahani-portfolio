import React, { useEffect, useState } from 'react';
import '../styles/AnimatedText.scss'; 

function AnimatedText({ finalMessage, animationDuration = 4 }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animated-text-wrapper">
      <p className={`animated-text ${showText ? 'show' : ''}`}>
        {finalMessage}
      </p>
    </div>
  );
}

export default AnimatedText;
