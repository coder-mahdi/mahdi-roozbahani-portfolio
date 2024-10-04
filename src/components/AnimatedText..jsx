import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function AnimatedText({ initialMessage, finalMessage, duration = 900, stayDuration = 2000 }) {
  const [displayedText, setDisplayedText] = useState(""); 
  const [showFinalText, setShowFinalText] = useState(false); 

  useEffect(() => {
    startAnimation(initialMessage, finalMessage);
  }, [initialMessage, finalMessage]);

  const startAnimation = (initialText, finalText) => {
    let currentText = initialText.split("");
    let iterations = 0;

    const interval = setInterval(() => {
      const newText = currentText.map((char, index) => {
        if (index <= iterations) {
          return initialText[index];
        } else {
          return initialText[index];
        }
      });

      setDisplayedText(newText.join(""));
      iterations += 1;

  
      if (iterations >= finalText.length) {
        clearInterval(interval);
        setTimeout(() => setShowFinalText(true), stayDuration); 
      }
    }, duration);
  };

  return (
    <h1 className="animated-text">
      {!showFinalText
        ? displayedText.split("").map((char, index) => (
            <motion.span
              key={index}
              className="animated-char"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))
        : (
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {finalMessage}
            </motion.span>
          )}
    </h1>
  );
}

export default AnimatedText;
