import React, { useCallback, useEffect, useRef, useState } from 'react';

interface VolumeSliderProps {
  value: number;
  onChange?: (value: number) => void;
  className?: string;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ value, onChange, className = '' }) => {
  const sliderRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e);
  };

  const updateValue = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newValue = x / rect.width;
    onChange?.(newValue);
  }, [onChange]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValue(e);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updateValue]);

  return (
    <svg
      ref={sliderRef}
      className={`w-full h-2 cursor-pointer ${className}`}
      onMouseDown={handleMouseDown}
      viewBox="0 0 100 4"
    >
      <defs>
        <linearGradient id="volumeGradient">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      
      {/* Background track */}
      <rect
        x="0"
        y="0"
        width="100"
        height="4"
        rx="2"
        fill="#e5e7eb"
        className="dark:fill-gray-700"
      />
      
      {/* Value track */}
      <rect
        x="0"
        y="0"
        width={value * 100}
        height="4"
        rx="2"
        fill="url(#volumeGradient)"
      />
      
      {/* Drag handle */}
      <circle
        cx={value * 100}
        cy="2"
        r="3"
        fill="white"
        stroke="#3b82f6"
        strokeWidth="1"
        className="hover:r-4 transition-all duration-150"
      />
    </svg>
  );
};

export default VolumeSlider;
