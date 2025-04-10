// icons.tsx
import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
  size?: number | string;
  onClick?: () => void;
}

// Transport Controls
export const PlayIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

export const StopIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M6 6h12v12H6z" />
  </svg>
);

export const RecordIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <circle cx="12" cy="12" r="8" />
  </svg>
);

// Navigation
export const FastForwardIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
  </svg>
);

export const RewindIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
  </svg>
);

// Tools
export const MetronomeIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.5 1.1 2.5 2.5S13.4 12 12 12s-2.5-1.1-2.5-2.5S10.6 7 12 7z" />
  </svg>
);

// Editor Controls
export const CutIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z" />
  </svg>
);

export const CopyIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
);

export const PasteIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z" />
  </svg>
);

// View Controls
export const ZoomInIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
  </svg>
);

export const ZoomOutIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
  </svg>
);

// Loop Controls
export const LoopIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
  </svg>
);

// Volume Controls
export const VolumeUpIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

export const VolumeMuteIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

// Effects
export const EffectsIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    onClick={onClick}
  >
    <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z" />
  </svg>
);

// Add these new icon components
export const FolderIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
    </svg>
);

export const FolderOpenIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
    </svg>
);

export const AudioFileIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
);

export const MidiFileIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 12c-2.7 0-5.8-1.29-6-2.01V15c0-.72 3.3-2 6-2s6 1.28 6 2v.99c-.2.72-3.3 2.01-6 2.01z"/>
    </svg>
);

// Add these to your icons.tsx file

// Track Types
export const AudioTrackIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
    </svg>
);

export const MidiTrackIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 4h3v6H8V4zm5 0h3v6h-3V4zM6 16c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4zm12 4h-4v-2c0-1.66-1.34-3-3-3s-3 1.34-3 3v2H6v-4c0-2.21 1.79-4 4-4s4 1.79 4 4v4z" />
    </svg>
);

export const VSTiTrackIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 8h-2v2h2v2h-2v2h-2v-2h-2v2H9v-2H7v-2h2v-2H7V8h2V6h2v2h2V6h2v2h2v2zm-4 2h-2v2h2v-2zm0-4h-2v2h2V8z" />
    </svg>
);

// Track Controls
export const MuteIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
);

export const SoloIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
    </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24, onClick }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        onClick={onClick}
    >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
);

export type IconType = 
  | 'play' 
  | 'pause' 
  | 'stop' 
  | 'record' 
  | 'fast-forward' 
  | 'rewind' 
  | 'metronome' 
  | 'cut' 
  | 'copy' 
  | 'paste' 
  | 'zoom-in' 
  | 'zoom-out' 
  | 'loop' 
  | 'volume-up' 
  | 'volume-mute' 
  | 'effects'
  | 'folder'
  | 'folder-open'
  | 'audio-file'
  | 'midi-file'
  | 'audio-track'
  | 'midi-track'
  | 'vsti-track'
  | 'mute'
  | 'solo'
  | 'chevron-right'
  | 'chevron-down';

export const IconComponent: React.FC<IconProps & { type: IconType }> = ({ type, ...props }) => {
  const icons = {
    'play': PlayIcon,
    'pause': PauseIcon,
    'stop': StopIcon,
    'record': RecordIcon,
    'fast-forward': FastForwardIcon,
    'rewind': RewindIcon,
    'metronome': MetronomeIcon,
    'cut': CutIcon,
    'copy': CopyIcon,
    'paste': PasteIcon,
    'zoom-in': ZoomInIcon,
    'zoom-out': ZoomOutIcon,
    'loop': LoopIcon,
    'volume-up': VolumeUpIcon,
    'volume-mute': VolumeMuteIcon,
    'effects': EffectsIcon,
    'folder': FolderIcon,
    'folder-open': FolderOpenIcon,
    'audio-file': AudioFileIcon,
    'midi-file': MidiFileIcon,
    'audio-track': AudioFileIcon,
    'midi-track': MidiFileIcon,
    'vsti-track': AudioFileIcon,
    'mute': VolumeMuteIcon,
    'solo': VolumeUpIcon,
    'chevron-right': FastForwardIcon,
    'chevron-down': RewindIcon,
  };

  const Icon = icons[type];
  return <Icon {...props} />;
};