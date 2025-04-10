// Timeline.tsx
import React, { useState, useRef, useEffect } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import TimelineGrid from './timelinegrid';

interface TimelineProps {
  pixelsPerBeat: number;
  beatsPerBar: number;
  totalBars: number;
  bpm: number;
  snap: '1/1' | '1/2' | '1/4' | '1/8' | '1/16';
  playheadPosition: number;
  isPlaying: boolean;
  onScroll: (position: number) => void;
  onPlayheadChange: (position: number) => void;
  onZoomChange?: (zoom: number) => void;
}

interface Marker {
  id: string;
  position: number;
  color: string;
  label: string;
}

interface LoopPoint {
  start: number;
  end: number;
}

const Timeline: React.FC<TimelineProps> = ({
  pixelsPerBeat = 40,
  beatsPerBar = 4,
  totalBars = 16,
  bpm = 120,
  snap = '1/16',
  playheadPosition,
  isPlaying,
  onScroll,
  onPlayheadChange,
  onZoomChange
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [loopPoints, setLoopPoints] = useState<LoopPoint | null>(null);
  const [isSettingLoopPoint, setIsSettingLoopPoint] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);

  const effectivePixelsPerBeat = pixelsPerBeat * zoom;
  const totalWidth = effectivePixelsPerBeat * beatsPerBar * totalBars;

  const snapValues = {
    '1/1': effectivePixelsPerBeat * beatsPerBar,
    '1/2': effectivePixelsPerBeat * beatsPerBar / 2,
    '1/4': effectivePixelsPerBeat,
    '1/8': effectivePixelsPerBeat / 2,
    '1/16': effectivePixelsPerBeat / 4
  };

  const snapToGrid = (position: number): number => {
    const snapValue = snapValues[snap];
    return Math.round(position / snapValue) * snapValue;
  };

  const handleZoom = (delta: number) => {
    const newZoom = Math.max(0.25, Math.min(4, zoom + delta * 0.1));
    setZoom(newZoom);
    onZoomChange?.(newZoom);
  };

  const addMarker = (position: number, label: string = '') => {
    const newMarker: Marker = {
      id: Date.now().toString(),
      position: snapToGrid(position),
      color: '#00A0FF',
      label: label || `Marker ${markers.length + 1}`
    };
    setMarkers([...markers, newMarker]);
  };

  const setLoopRegion = (start: number, end: number) => {
    setLoopPoints({ start: snapToGrid(start), end: snapToGrid(end) });
  };

  const formatTime = (pixels: number): string => {
    const beats = pixels / effectivePixelsPerBeat;
    const bars = Math.floor(beats / beatsPerBar) + 1;
    const beat = Math.floor(beats % beatsPerBar) + 1;
    const ticks = Math.floor((beats % 1) * 960);
    return `${bars}.${beat}.${String(ticks).padStart(3, '0')}`;
  };

  const renderBarNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= totalBars; i++) {
      numbers.push(
        <div
          key={i}
          className="absolute top-0 flex items-center justify-between h-full px-1 border-l border-[#2a2a2a]"
          style={{
            left: (i - 1) * effectivePixelsPerBeat * beatsPerBar,
            width: effectivePixelsPerBeat * beatsPerBar
          }}
        >
          <span className="text-xs text-gray-400">{i}</span>
          <span className="text-xs text-gray-600">
            {formatTime((i - 1) * effectivePixelsPerBeat * beatsPerBar)}
          </span>
        </div>
      );
    }
    return numbers;
  };

  const renderMarkers = () => {
    return markers.map(marker => (
      <div
        key={marker.id}
        className="absolute top-0 h-full flex items-center z-10"
        style={{ left: marker.position }}
      >
        <div 
          className="w-px h-full"
          style={{ backgroundColor: marker.color }}
        />
        <span className="ml-1 text-xs" style={{ color: marker.color }}>
          {marker.label}
        </span>
      </div>
    ));
  };

  const renderLoopRegion = () => {
    if (!loopPoints) return null;
    
    return (
      <div
        className="absolute top-0 h-full bg-blue-500/20 border-l border-r border-blue-500 z-20"
        style={{
          left: loopPoints.start,
          width: loopPoints.end - loopPoints.start
        }}
      />
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const position = containerRef.current.scrollLeft;
        setScrollPosition(position);
        onScroll(position);
      }
    };

    containerRef.current?.addEventListener('scroll', handleScroll);
    return () => containerRef.current?.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  useEffect(() => {
    let animationFrame: number;
    
    const animate = () => {
      if (isPlaying && !isDraggingPlayhead) {
        const newPosition = playheadPosition + (effectivePixelsPerBeat * bpm) / (60 * 60);
        
        if (loopPoints && newPosition >= loopPoints.end) {
          onPlayheadChange(loopPoints.start);
        } else {
          onPlayheadChange(newPosition);
        }
        
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isPlaying && !isDraggingPlayhead) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, playheadPosition, effectivePixelsPerBeat, bpm, isDraggingPlayhead, loopPoints, onPlayheadChange]);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      handleZoom(e.deltaY > 0 ? -1 : 1);
    }
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="h-full w-full">
        <div 
          className="flex flex-col h-full w-full bg-[#121212] relative"
          onWheel={handleWheel}
        >
          {/* Timeline Header */}
          <div className="h-8 min-h-[32px] border-b border-[#2a2a2a] relative overflow-hidden">
            <div 
              ref={timelineRef}
              className="absolute top-0 left-0 h-full"
              style={{ width: totalWidth }}
            >
              {renderBarNumbers()}
            </div>
          </div>

          {/* Timeline Content */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-x-auto overflow-y-hidden relative"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: '#444 #1a1a1a'
            }}
          >
            <div 
              className="absolute top-0 left-0 w-full h-full"
              style={{ width: totalWidth, minHeight: '100%' }}
              onMouseDown={(e) => {
                if (containerRef.current) {
                  const rect = containerRef.current.getBoundingClientRect();
                  const newPosition = snapToGrid(e.clientX - rect.left + scrollPosition);
                  
                  if (e.shiftKey) {
                    setIsSettingLoopPoint(true);
                    setLoopPoints({ start: newPosition, end: newPosition });
                  } else {
                    setIsDraggingPlayhead(true);
                    onPlayheadChange(newPosition);
                  }
                }
              }}
              onMouseMove={(e) => {
                if (containerRef.current && (isDraggingPlayhead || isSettingLoopPoint)) {
                  const rect = containerRef.current.getBoundingClientRect();
                  const newPosition = snapToGrid(e.clientX - rect.left + scrollPosition);
                  
                  if (isSettingLoopPoint && loopPoints) {
                    setLoopPoints(prev => prev ? {
                      ...prev,
                      end: Math.max(prev.start, newPosition)
                    } : null);
                  } else if (isDraggingPlayhead) {
                    onPlayheadChange(newPosition);
                  }
                }
              }}
              onMouseUp={() => {
                setIsDraggingPlayhead(false);
                setIsSettingLoopPoint(false);
              }}
              onMouseLeave={() => {
                setIsDraggingPlayhead(false);
                setIsSettingLoopPoint(false);
              }}
            >
              <TimelineGrid
                totalBars={totalBars}
                beatsPerBar={beatsPerBar}
                snap={snap}
                effectivePixelsPerBeat={effectivePixelsPerBeat}
              />
              {renderMarkers()}
              {renderLoopRegion()}
              
              {/* Playhead */}
              <div
                ref={playheadRef}
                className="absolute top-0 bottom-0 w-px bg-blue-500 pointer-events-none z-30"
                style={{ left: playheadPosition }}
              />
            </div>
          </div>
        </div>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content 
          className="min-w-[160px] bg-[#1a1a1a] rounded-md shadow-lg py-1 border border-[#2a2a2a] z-50"
        >
          <ContextMenu.Item 
            className="text-xs px-3 py-1 hover:bg-[#252525] cursor-pointer text-[#9f9f9f] hover:text-white"
            onClick={() => {
              if (timelineRef.current) {
                addMarker(playheadPosition);
              }
            }}
          >
            Add Marker
          </ContextMenu.Item>
          <ContextMenu.Separator className="h-px bg-[#2a2a2a] my-1" />
          <ContextMenu.Item 
            className="text-xs px-3 py-1 hover:bg-[#252525] cursor-pointer text-[#9f9f9f] hover:text-white"
            onClick={() => setLoopPoints(null)}
          >
            Clear Loop Region
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default Timeline;