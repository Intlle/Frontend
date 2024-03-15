import React from 'react';

const CustomEdge = ({ sourceX, sourceY, targetX, targetY }) => {
  return (
    <line
      x1={sourceX}
      y1={sourceY}
      x2={targetX}
      y2={targetY}
      strokeWidth="2"
      stroke="rgba(255,255,255,0.5)"
    />
  );
};

export default CustomEdge;