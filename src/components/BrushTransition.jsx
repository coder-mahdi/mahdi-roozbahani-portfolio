import React, { useEffect, useState } from 'react';
import '../styles/BrushTransition.scss';

function BrushTransition({ children }) {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false); // بعد از 3 ثانیه لایه محو می‌شود
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showTransition && <div className="brush-transition"></div>}
      {children}
    </>
  );
}

export default BrushTransition;
