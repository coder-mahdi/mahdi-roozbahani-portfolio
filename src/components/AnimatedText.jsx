import React, { useEffect, useState } from 'react';
import '../styles/AnimatedText.scss'; 

function AnimatedText({ finalMessage }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="animated-text-wrapper" role="region" aria-live="polite">
      <p 
        className={`animated-text ${showText ? 'show' : ''}`}
      >
        {finalMessage}
      </p>
    </section>
  );
}

export default AnimatedText;
