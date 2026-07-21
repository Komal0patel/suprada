import React, { useEffect, useRef } from 'react';

export default function TwinklingLights() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = false;
    let isLooping = false;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    
    resizeCanvas();

    const spacing = 72; // Increased spacing to cut particle counts ~6.5 times (huge performance boost)
    let dots = [];

    const initDots = () => {
      dots = [];
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const isGold = Math.random() > 0.35;
          dots.push({
            x: c * spacing + (spacing / 2),
            y: r * spacing + (spacing / 2),
            phase: Math.random() * Math.PI * 2,
            speed: 0.008 + Math.random() * 0.015,
            maxOpacity: isGold ? (0.25 + Math.random() * 0.45) : (0.15 + Math.random() * 0.25),
            size: 1.0 + Math.random() * 0.8,
            color: isGold ? '220, 160, 50' : '244, 240, 236'
          });
        }
      }
    };
    
    initDots();
    
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      initDots();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const draw = () => {
      if (!isVisible) {
        isLooping = false;
        return;
      }
      isLooping = true;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.forEach(dot => {
        dot.phase += dot.speed;
        const intensity = (Math.cos(dot.phase) + 1) / 2;
        const opacity = intensity * dot.maxOpacity;
        
        if (opacity > 0.01) {
          // Draw primary star
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dot.color}, ${opacity})`;
          ctx.fill();
          
          // Draw a fast outer glow circle (instead of expensive shadowBlur)
          if (intensity > 0.45) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${dot.color}, ${opacity * 0.25})`;
            ctx.fill();
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // IntersectionObserver to pause the canvas loop when out of viewport
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !isLooping) {
        draw();
      }
    }, { threshold: 0.02 });

    intersectionObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 0 
      }} 
    />
  );
}
