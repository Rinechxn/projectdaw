import React, { useEffect, useRef } from 'react';

interface KnobProps {
  id: string;
  x: number;
  y: number;
  size: number;
  colors: [string, string, string, string];
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  mode?: 'vertical' | 'circular';
  disabled?: boolean;
}

const Knob: React.FC<KnobProps> = ({
  id,
  x,
  y,
  size,
  colors,
  min = 0,
  max = 1,
  value = 0,
  onChange,
  mode = 'vertical',
  disabled = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef({ isDragging: false, startY: 0, startValue: 0 });

  const drawKnob = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const [_, outerColor, knobColor, percentColor] = colors;
    const percent = (value - min) / (max - min);
    const centerX = x + size / 2;
    const centerY = y + size / 2;

    // Clear with transparency
    ctx.clearRect(x, y, size, size);

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size / 2 - 2, 0, 2 * Math.PI);
    ctx.strokeStyle = outerColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw value indicator
    ctx.beginPath();
    const angle = (percent * 1.5 + 0.75) * Math.PI;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(angle) * (size / 3),
      centerY + Math.sin(angle) * (size / 3)
    );
    ctx.strokeStyle = percentColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    dragRef.current = {
      isDragging: true,
      startY: e.clientY,
      startValue: value
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragRef.current.isDragging) return;
    
    const dy = dragRef.current.startY - e.clientY;
    const range = max - min;
    const newValue = Math.min(max, Math.max(min,
      dragRef.current.startValue + (dy / 100) * range
    ));
    
    onChange?.(newValue);
  };

  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    drawKnob();
  }, [value, size, colors]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      width={size}
      height={size}
      onMouseDown={handleMouseDown}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    />
  );
};

export default Knob;