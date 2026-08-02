import React, { useMemo } from 'react';

export default function StarfieldBackground() {
  // Generate a deterministic grid of luxury twinkling stars
  const stars = useMemo(() => {
    const starList = [];
    const rows = 14;
    const cols = 12;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Only place stars on select grid nodes with subtle randomness
        const seed = (r * 13 + c * 29) % 100;
        if (seed < 45) {
          const top = `${(r / rows) * 100 + (seed % 5) - 2.5}%`;
          const left = `${(c / cols) * 100 + ((seed * 3) % 5) - 2.5}%`;
          const size = seed % 3 === 0 ? 3.5 : seed % 2 === 0 ? 2.5 : 1.8;
          const isGold = seed % 2 === 0;
          const delay = ((seed * 0.3) % 4).toFixed(1);
          const duration = (2.5 + (seed % 3.5)).toFixed(1);
          
          starList.push({
            id: `${r}-${c}`,
            top,
            left,
            size,
            isGold,
            delay,
            duration
          });
        }
      }
    }
    return starList;
  }, []);

  return (
    <div className="starfield-global-container" aria-hidden="true">
      {/* Subtle Grid Lines Layer */}
      <div className="starfield-grid-pattern"></div>

      {/* Twinkling Star Points */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`starfield-point ${star.isGold ? 'gold-star' : 'white-star'}`}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
    </div>
  );
}
