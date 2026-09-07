import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { FLOW_STEPS } from '../../data/modulesData';
import { FigmaFrame } from './FigmaFrame';
import { FlowConnectors } from './FlowConnectors';
import { FigmaTopBar } from './FigmaTopBar';
import { useApp } from '../../context/AppContext';
import { Move, MousePointer, Info } from 'lucide-react';

export const FigmaCanvas = () => {
  const { activeStepId, selectStep, canvasLayout, framePositions } = useApp();

  // Convert framePositions object into an array ordered by FLOW_STEPS
  const calculateFrameCoords = () => {
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

    return FLOW_STEPS.map((step, idx) => {
      // If custom frame position exists, use it
      if (framePositions[step.id] && canvasLayout === 'FREE_DRAG') {
        return {
          id: step.id,
          x: framePositions[step.id].x,
          y: framePositions[step.id].y,
          width: frameWidth,
          height: frameHeight
        };
      }

      // Default column/row grid position
      const colIdx = idx % cols;
      const rowIdx = Math.floor(idx / cols);

      return {
        id: step.id,
        x: startX + colIdx * (frameWidth + gapX),
        y: startY + rowIdx * (frameHeight + gapY),
        width: frameWidth,
        height: frameHeight
      };
    });
  };

  const computedCoords = calculateFrameCoords();

  return (
    <TransformWrapper
      initialScale={1}
      minScale={0.3}
      maxScale={2}
      centerOnInit={false}
      limitToBounds={false}
      panning={{
        disabled: false,
        velocityDisabled: false,
        excluded: ['no-drag', 'cursor-grab', 'cursor-grabbing']
      }}
      wheel={{ step: 0.1 }}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Top Bar with Zoom & Layout controls */}
          <FigmaTopBar zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />

          {/* Infinite Canvas Viewport */}
          <div className="flex-1 figma-bg-grid overflow-hidden relative cursor-grab active:cursor-grabbing">
            {/* Instruction Floating Pill Banner */}
            <div className="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-indigo-100 shadow-lg text-slate-700 text-xs flex items-center gap-2 pointer-events-none">
              <span className="p-1 rounded-lg bg-indigo-100 text-indigo-700 font-bold">
                <MousePointer className="w-3.5 h-3.5" />
              </span>
              <div>
                <span className="font-bold text-slate-900 block">Figma Interactive Canvas</span>
                <span className="text-[10px] text-slate-500">
                  คลิกลากผืนผ้าใบเพื่อ Pan • Scroll Wheel เพื่อ Zoom • ดับเบิลคลิกข้อความเพื่อ Edit
                </span>
              </div>
            </div>

            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
              contentStyle={{ width: '3800px', height: '2400px', position: 'relative' }}
            >
              {/* Dynamic SVG Flow Lines connecting frame positions */}
              <FlowConnectors framePositions={computedCoords} canvasLayout={canvasLayout} />

              {/* 6 Mobile Frames rendered at computed (x, y) coordinates */}
              <div className="relative w-full h-full p-8">
                {FLOW_STEPS.map((step, idx) => {
                  const coord = computedCoords[idx];
                  const isFocused = activeStepId === step.id;

                  return (
                    <FigmaFrame
                      key={step.id}
                      step={step}
                      isFocused={isFocused}
                      onFocus={() => selectStep(step.id)}
                      position={{ x: coord.x, y: coord.y }}
                      style={{
                        position: 'absolute',
                        left: `${coord.x}px`,
                        top: `${coord.y}px`
                      }}
                    />
                  );
                })}
              </div>
            </TransformComponent>
          </div>
        </div>
      )}
    </TransformWrapper>
  );
};
