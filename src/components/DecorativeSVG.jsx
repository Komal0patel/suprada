import React from 'react';

export default function DecorativeSVG({ src, style = {}, className = '', alt = '', ...props }) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : 'true'}
      className={className}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        ...style
      }}
      {...props}
    />
  );
}
