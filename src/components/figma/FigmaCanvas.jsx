import React, { useState, useEffect, useRef } from 'react';
import { FLOW_STEPS } from '../../data/modulesData';
import { FigmaFrame } from './FigmaFrame';
import { FlowConnectors } from './FlowConnectors';
import { useApp } from '../../context/AppContext';

export const FigmaCanvas = () => {
  const { activeStepId, selectStep, zoomScale, canvasLayout } = useApp();
  const canvasRef = useRef(null);
  const [framePositions, setFramePositions] = useState([]);

  // Calculate layout coordinates for SVG connecting lines dynamically
  useEffect(() => {
    const updatePositions = () => {
      const frameWidth = 380;
      const frameHeight = 760;
      const startX = 60;
      const startY = 80;

      let cols = 6;
      let gapX = 140;
      let gapY = 140;

      if (canvasLayout === '2_COLS') {
        cols = 2;
        gapX = 160;
        gapY = 140;
      } else if (canvasLayout === '3_COLS') {
        cols = 3;
        gapX = 140;
        gapY = 140;
      }

      const positions = FLOW_STEPS.map((_, idx) => {
        const colIdx = idx % cols;
        const rowIdx = Math.floor(idx / cols);

        return {
          x: startX + colIdx * (frameWidth + gapX),
          y: startY + rowIdx * (frameHeight + gapY),
          width: frameWidth,
          height: frameHeight
        };
      });

      setFramePositions(positions);
    };

    updatePositions();
  }, [canvasLayout]);

  // Determine grid container dimensions & CSS layout class
  const getLayoutContainerStyle = () => {
    if (canvasLayout === '2_COLS') {
      return { minWidth: '1200px', minHeight: '2900px' };
    } else if (canvasLayout === '3_COLS') {
      return { minWidth: '1750px', minHeight: '2000px' };
    }
    return { minWidth: '3400px', minHeight: '1050px' };
  };

  const getFlexGridClass = () => {
    if (canvasLayout === '2_COLS') return 'grid grid-cols-2 gap-x-40 gap-y-36 max-w-[1100px]';
    if (canvasLayout === '3_COLS') return 'grid grid-cols-3 gap-x-36 gap-y-36 max-w-[1600px]';
    return 'flex items-start gap-32';
  };

  return (
    <div className="flex-1 h-[calc(100vh-3.5rem)] figma-bg-grid overflow-auto relative p-8">
      {/* Zoomable Container */}
      <div
        ref={canvasRef}
        className="relative transition-all duration-300 origin-top-left py-4"
        style={{
          transform: `scale(${zoomScale})`,
          ...getLayoutContainerStyle()
        }}
      >
        {/* SVG Connector lines connecting steps */}
        <FlowConnectors framePositions={framePositions} canvasLayout={canvasLayout} />

        {/* Mobile Frames positioned in selected grid/column layout */}
        <div className={`${getFlexGridClass()} relative z-10 pl-8 pt-4`}>
          {FLOW_STEPS.map((step) => {
            const isFocused = activeStepId === step.id;

            return (
              <FigmaFrame
                key={step.id}
                step={step}
                isFocused={isFocused}
                onFocus={() => selectStep(step.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
