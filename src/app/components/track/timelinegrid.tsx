// timelinegrid.tsx
import React from 'react';

interface TimelineGridProps {
  totalBars: number;
  beatsPerBar: number;
  snap: '1/1' | '1/2' | '1/4' | '1/8' | '1/16';
  effectivePixelsPerBeat: number;
}

const TimelineGrid: React.FC<TimelineGridProps> = ({
  totalBars,
  beatsPerBar,
  snap,
  effectivePixelsPerBeat,
}) => {
  const renderGridLines = () => {
    const lines = [];
    const totalBeats = totalBars * beatsPerBar;
    const subDivisions = {
      '1/1': 1,
      '1/2': 2,
      '1/4': 4,
      '1/8': 8,
      '1/16': 16
    }[snap];

    // Render bar lines
    for (let bar = 0; bar <= totalBars; bar++) {
      lines.push(
        <div
          key={`bar-${bar}`}
          className="absolute top-0 bottom-0 w-[1px] bg-[#2a2a2a]"
          style={{
            left: bar * beatsPerBar * effectivePixelsPerBeat,
          }}
        />
      );
    }

    // Render beat lines
    for (let beat = 0; beat <= totalBeats; beat++) {
      if (beat % beatsPerBar !== 0) {
        lines.push(
          <div
            key={`beat-${beat}`}
            className="absolute top-0 bottom-0 w-[1px] bg-[#1a1a1a]"
            style={{
              left: beat * effectivePixelsPerBeat,
            }}
          />
        );
      }
    }

    // Render subdivision lines
    if (subDivisions > 1) {
      const totalSubdivisions = totalBeats * subDivisions;
      for (let sub = 0; sub <= totalSubdivisions; sub++) {
        if (sub % subDivisions !== 0) {
          lines.push(
            <div
              key={`sub-${sub}`}
              className="absolute top-0 bottom-0 w-[1px]"
              style={{
                left: (sub * effectivePixelsPerBeat) / subDivisions,
                backgroundColor: 'rgba(26, 26, 26, 0.5)'
              }}
            />
          );
        }
      }
    }

    return lines;
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {renderGridLines()}
    </div>
  );
};

export default TimelineGrid;