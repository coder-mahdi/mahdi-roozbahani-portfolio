import React, { useEffect, useState } from 'react';

function TypewriterText({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <p className="welcome-message" aria-label="Animated greeting text" tabIndex="0">{displayedText}</p>;
}

export default TypewriterText;
