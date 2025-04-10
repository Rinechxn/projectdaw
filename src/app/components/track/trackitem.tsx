// TrackItem.tsx
import React from 'react';
import Knob from '../core/knob';
import VolumeSlider from '../core/volumeslider';
import { AudioTrackIcon, MidiTrackIcon, VSTiTrackIcon } from '@app/shared/icons';

// Utility functions for dB conversion
const linearToDb = (linear: number): number => {
  if (linear <= 0) return -Infinity;
  return 20 * Math.log10(linear);
};

const formatDb = (db: number): string => {
  if (db <= -60) return '-∞';
  return db.toFixed(1);
};

// Types
export type TrackType = 'audio' | 'midi' | 'vsti';

export interface TrackItemProps {
  id: string;
  name: string;
  type: TrackType;
  volume: number;
  pan: number;
  isMuted: boolean;
  isSolo: boolean;
  isArmed: boolean;
  input: string;
  output: string;
  color?: string;
  isSelected: boolean;
  onVolumeChange: (value: number) => void;
  onPanChange: (value: number) => void;
  onMuteToggle: () => void;
  onSoloToggle: () => void;
  onArmToggle: () => void;
}

const TrackItem: React.FC<TrackItemProps> = ({
  id,
  name,
  type,
  volume = 0.75,
  pan = 0,
  isMuted = false,
  isSolo = false,
  isArmed = false,
  onVolumeChange,
  onPanChange,
  onMuteToggle,
  onSoloToggle,
  onArmToggle
}) => {
  const panColors: [string, string, string, string] = [
    'rgba(0,0,0,0.1)',
    '#ffffff0e',
    '#374151',
    '#ffffff'
  ];

  function getTrackTypeIcon(type: TrackType) {
    switch (type) {
      case 'audio': return <AudioTrackIcon className="w-4 h-4" />;
      case 'midi': return <MidiTrackIcon className="w-4 h-4" />;
      case 'vsti': return <VSTiTrackIcon className="w-4 h-4" />;
      default: return <AudioTrackIcon className="w-4 h-4" />;
    }
  }

  // Convert linear volume to dB for display
  const volumeDb = linearToDb(volume);

  return (
    <div
      className={`
        flex items-center h-[42px] gap-2 px-2
        bg-gray-100 dark:bg-[#222222]
        border-y border-gray-200 dark:border-gray-700
        ${isMuted ? 'opacity-70' : 'opacity-100'}
      `}
    >
      <div className={`
        w-1 h-[24px] rounded-sm
        ${type === 'audio' ? 'bg-emerald-500' :
          type === 'midi' ? 'bg-violet-500' :
            'bg-amber-500'}
      `} />

      {/* Track Info Section */}
      <div className="flex-1 flex items-center min-w-[120px] gap-2">
        <span className="text-gray-500 shrink-0">
          {getTrackTypeIcon(type)}
        </span>
        <div className='flex-1 flex flex-col justify-start -space-y-1 min-w-0'>
          <span className="text-sm truncate text-gray-700 dark:text-gray-200">
            {name}
          </span>
          <div className="flex items-center gap-2">
            <VolumeSlider
              value={volume}
              onChange={onVolumeChange}
              className="flex-1"
            />
            <span className="text-xs text-gray-500 w-16 shrink-0 text-right">
              {formatDb(volumeDb)} dB
            </span>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={onMuteToggle}
            className={`
              w-6 h-6 rounded
              text-xs font-bold
              ${isMuted
                ? 'text-red-500'
                : ' text-gray-600'}
            `}
          >
            M
          </button>

          <button
            onClick={onSoloToggle}
            className={`
              w-6 h-6 rounded
              text-xs font-bold
              ${isSolo
                ? ' text-white'
                : ' text-gray-600'}
            `}
          >
            S
          </button>

          {(type === 'audio' || type === 'midi') && (
            <button
              onClick={onArmToggle}
              className={`
                w-6 h-6 rounded
                text-xs font-bold
                ${isArmed
                  ? 'bg-red-500 text-white'
                  : ' text-gray-600'}
              `}
            >
              R
            </button>
          )}
        </div>

        <div className="flex flex-col items-center">
          <Knob
            id={`pan-${id}`}
            size={32}
            value={pan}
            min={-1}
            max={1}
            onChange={onPanChange}
            colors={panColors}
            disabled={isMuted}
            x={0}
            y={0}
          />
        </div>
      </div>
    </div>
  );
};

export default TrackItem;