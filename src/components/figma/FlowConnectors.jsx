import React from 'react';

export const FlowConnectors = ({ framePositions, canvasLayout }) => {
  if (!framePositions || framePositions.length < 2) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <marker
          id="arrowHead"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#4f46e5" />
        </marker>
      </defs>

      {framePositions.slice(0, -1).map((pos, idx) => {
        const nextPos = framePositions[idx + 1];
        if (!pos || !nextPos) return null;

        let startX, startY, endX, endY, controlX1, controlY1, controlX2, controlY2;

        // Check if next frame is in the same row or wrapping to next row
        const isSameRow = Math.abs(pos.y - nextPos.y) < 50;

        if (isSameRow) {
          // Horizontal flow
          startX = pos.x + pos.width;
          startY = pos.y + pos.height / 2;
          endX = nextPos.x;
          endY = nextPos.y + nextPos.height / 2;

          controlX1 = startX + 80;
          controlY1 = startY;
          controlX2 = endX - 80;
          controlY2 = endY;
        } else {
          // Wrapped to next row (S-curve flow)
          startX = pos.x + pos.width / 2;
          startY = pos.y + pos.height;
          endX = nextPos.x + nextPos.width / 2;
          endY = nextPos.y;

          controlX1 = startX;
          controlY1 = startY + 90;
          controlX2 = endX;
          controlY2 = endY - 90;
        }

        const pathData = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;

        return (
          <g key={idx}>
            {/* Glow Path background */}
            <path
              d={pathData}
              fill="none"
              stroke="#6366f1"
              strokeWidth="4"
              strokeOpacity="0.2"
            />
            {/* Animated Flow Line */}
            <path
              d={pathData}
              fill="none"
              stroke="url(#flowGrad)"
              strokeWidth="2.5"
              className="animate-flow-line"
              markerEnd="url(#arrowHead)"
            />
            {/* Flow Step Badge */}
            <foreignObject
              x={(startX + endX) / 2 - 35}
              y={(startY + endY) / 2 - 14}
              width="70"
              height="28"
            >
              <div className="bg-white/95 text-[10px] font-mono text-indigo-700 font-bold border border-indigo-200 rounded-full px-2 py-0.5 text-center shadow-md backdrop-blur-md">
                FLOW {idx + 1}→{idx + 2}
              </div>
            </foreignObject>
          </g>
        );
      })}
    </svg>
  );
};
