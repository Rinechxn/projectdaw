// trackcontrol.tsx
import { useState, useRef, useEffect } from "react";
import TrackItem from "./trackitem";
import * as Popover from '@radix-ui/react-popover';
import * as ContextMenu from '@radix-ui/react-context-menu';

export type TrackType = 'audio' | 'midi' | 'vsti';

interface TrackControlProps {
  scrollPosition: number;
  playheadPosition: number;
  timelineState: {
    pixelsPerBeat: number;
    beatsPerBar: number;
    totalBars: number;
    bpm: number;
    snap: '1/1' | '1/2' | '1/4' | '1/8' | '1/16';
  };
}

interface Track {
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
  isDisabled?: boolean;
  isLocked?: boolean;
  isAutomationVisible?: boolean;
  color?: string;
}

interface MenuItemProps {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
}

// MenuItem Component
const MenuItem: React.FC<MenuItemProps> = ({ label, shortcut, disabled, onClick }) => (
  <ContextMenu.Item 
    className={`
      text-xs px-3 py-1 hover:bg-[#252525] cursor-pointer
      ${disabled ? 'text-[#666666]' : 'text-[#9f9f9f] hover:text-white'}
      flex items-center justify-between
    `}
    disabled={disabled}
    onClick={onClick}
  >
    <span>{label}</span>
    {shortcut && <span className="text-[#666666] ml-4">{shortcut}</span>}
  </ContextMenu.Item>
);

// SubMenu Component
const SubMenu: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <ContextMenu.Sub>
    <ContextMenu.SubTrigger 
      className="text-xs px-3 py-1 hover:bg-[#252525] cursor-pointer text-[#9f9f9f] hover:text-white flex items-center justify-between w-full"
    >
      <span>{label}</span>
      <span>▶</span>
    </ContextMenu.SubTrigger>
    <ContextMenu.Portal>
      <ContextMenu.SubContent 
        className="bg-[#1a1a1a] rounded-md shadow-lg py-1 min-w-[160px] border border-[#2a2a2a]"
        sideOffset={2}
        alignOffset={-5}
      >
        {children}
      </ContextMenu.SubContent>
    </ContextMenu.Portal>
  </ContextMenu.Sub>
);

const TrackControl: React.FC<TrackControlProps> = ({
  scrollPosition,
  playheadPosition,
  timelineState
}) => {
  const [tracks, setTracks] = useState<Track[]>([{
    id: '1',
    name: 'Guitar',
    type: 'vsti',
    volume: 0.75,
    pan: 0,
    isMuted: false,
    isSolo: false,
    isArmed: false,
    input: 'Input 1',
    output: 'Master',
    isDisabled: false,
    isLocked: false,
    isAutomationVisible: false,
    color: '#4CAF50'
  }]);

  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [isAddTrackOpen, setIsAddTrackOpen] = useState(false);
  const newTrackNameRef = useRef<HTMLInputElement>(null);

  const addTrack = (type: TrackType) => {
    const newTrack: Track = {
      id: Date.now().toString(),
      name: newTrackNameRef.current?.value || `Track ${tracks.length + 1}`,
      type,
      volume: 0.75,
      pan: 0,
      isMuted: false,
      isSolo: false,
      isArmed: false,
      input: 'Input 1',
      output: 'Master',
      isDisabled: false,
      isLocked: false,
      isAutomationVisible: false,
      color: getRandomColor()
    };
    setTracks([...tracks, newTrack]);
    setIsAddTrackOpen(false);
  };

  const getRandomColor = (): string => {
    const colors = [
      '#4CAF50', '#2196F3', '#9C27B0', '#F44336',
      '#FF9800', '#FFEB3B', '#795548', '#607D8B'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const deleteTrack = (id: string) => {
    setTracks(tracks.filter(track => track.id !== id));
    setSelectedTracks(selectedTracks.filter(trackId => trackId !== id));
  };

  const duplicateTrack = (id: string, complete: boolean = false) => {
    const trackToDuplicate = tracks.find(track => track.id === id);
    if (trackToDuplicate) {
      const newTrack: Track = {
        ...trackToDuplicate,
        id: Date.now().toString(),
        name: `${trackToDuplicate.name} Copy`,
        color: complete ? trackToDuplicate.color : getRandomColor()
      };
      setTracks([...tracks, newTrack]);
    }
  };

  const updateTrack = (id: string, updates: Partial<Track>) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, ...updates } : track
    ));
  };

  const handleTrackSelection = (id: string, event: React.MouseEvent) => {
    if (event.ctrlKey) {
      setSelectedTracks(prev => 
        prev.includes(id) 
          ? prev.filter(trackId => trackId !== id)
          : [...prev, id]
      );
    } else if (event.shiftKey && selectedTracks.length > 0) {
      const lastSelected = selectedTracks[selectedTracks.length - 1];
      const lastIndex = tracks.findIndex(track => track.id === lastSelected);
      const currentIndex = tracks.findIndex(track => track.id === id);
      const start = Math.min(lastIndex, currentIndex);
      const end = Math.max(lastIndex, currentIndex);
      const newSelection = tracks.slice(start, end + 1).map(track => track.id);
      setSelectedTracks(newSelection);
    } else {
      setSelectedTracks([id]);
    }
  };

  const trackHandlers = (trackId: string) => ({
    toggleDisabled: () => updateTrack(trackId, { isDisabled: !tracks.find(t => t.id === trackId)?.isDisabled }),
    toggleLocked: () => updateTrack(trackId, { isLocked: !tracks.find(t => t.id === trackId)?.isLocked }),
    toggleAutomation: () => updateTrack(trackId, { isAutomationVisible: !tracks.find(t => t.id === trackId)?.isAutomationVisible }),
    duplicate: (complete: boolean) => duplicateTrack(trackId, complete),
    delete: () => deleteTrack(trackId),
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedTracks.length > 0) {
        selectedTracks.forEach(trackId => deleteTrack(trackId));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTracks]);

  return (
    <div 
      className="w-96  z-[999] bg-[#121212] text-white flex flex-col border-r border-[#2a2a2a]"
      style={{ 
        height: timelineState.pixelsPerBeat * timelineState.beatsPerBar * timelineState.totalBars 
      }}
    >
      <div className="w-full h-8 border-b border-[#2a2a2a] p-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#9f9f9f]">Track Control</span>
          <Popover.Root open={isAddTrackOpen} onOpenChange={setIsAddTrackOpen}>
            <Popover.Trigger asChild>
              <button className="text-xs text-[#9f9f9f] hover:text-white transition-colors">
                Add Track
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="bg-[#1a1a1a] rounded-md shadow-lg p-3 w-64 border border-[#2a2a2a]">
                <div className="space-y-3">
                  <input
                    ref={newTrackNameRef}
                    type="text"
                    placeholder="Track Name"
                    className="w-full bg-[#252525] rounded px-2 py-1 text-xs border border-[#3a3a3a] focus:outline-none focus:border-[#4a4a4a]"
                  />
                  <div className="grid grid-cols-1 gap-1">
                    <button
                      onClick={() => addTrack('audio')}
                      className="bg-[#252525] hover:bg-[#303030] rounded px-3 py-1.5 text-xs text-[#9f9f9f] hover:text-white transition-colors"
                    >
                      Audio Track
                    </button>
                    <button
                      onClick={() => addTrack('midi')}
                      className="bg-[#252525] hover:bg-[#303030] rounded px-3 py-1.5 text-xs text-[#9f9f9f] hover:text-white transition-colors"
                    >
                      MIDI Track
                    </button>
                    <button
                      onClick={() => addTrack('vsti')}
                      className="bg-[#252525] hover:bg-[#303030] rounded px-3 py-1.5 text-xs text-[#9f9f9f] hover:text-white transition-colors"
                    >
                      VSTi Track
                    </button>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tracks.map(track => (
          <div
            key={track.id}
            className={`
              relative
              ${selectedTracks.includes(track.id) ? 'bg-[#252525]' : ''}
            `}
            onClick={(e) => handleTrackSelection(track.id, e)}
          >
            <ContextMenu.Root>
              <ContextMenu.Trigger className="w-full">
                <TrackItem
                  {...track}
                  onVolumeChange={(value) => updateTrack(track.id, { volume: value })}
                  onPanChange={(value) => updateTrack(track.id, { pan: value })}
                  onMuteToggle={() => updateTrack(track.id, { isMuted: !track.isMuted })}
                  onSoloToggle={() => updateTrack(track.id, { isSolo: !track.isSolo })}
                  onArmToggle={() => updateTrack(track.id, { isArmed: !track.isArmed })}
                  isSelected={selectedTracks.includes(track.id)}
                />
              </ContextMenu.Trigger>

              <ContextMenu.Portal>
                <ContextMenu.Content 
                  className="bg-[#1a1a1a] rounded-md shadow-lg py-1 min-w-[200px] border border-[#2a2a2a]"
                >
                  <MenuItem label="Expand Envelopes" />
                  <MenuItem label="Edit Track" />
                  <MenuItem label="Hide Track" />
                  <MenuItem label="Show in Console" />
                  
                  <ContextMenu.Separator className="h-px bg-[#2a2a2a] my-1" />
                  
                  <MenuItem 
                    label="Remove Track" 
                    shortcut="Shift+T"
                    onClick={() => trackHandlers(track.id).delete()}
                  />
                  <MenuItem 
                    label="Duplicate Track"
                    onClick={() => trackHandlers(track.id).duplicate(false)}
                  />
                  <MenuItem 
                    label="Duplicate Track (complete)"
                    onClick={() => trackHandlers(track.id).duplicate(true)}
                  />
                  
                  <MenuItem 
                    label="Group Selected Tracks"
                    shortcut="Ctrl+G"
                    disabled={selectedTracks.length < 2}
                  />
                  <MenuItem 
                    label="Dissolve Group"
                    shortcut="Ctrl+Shift+G"
                    disabled
                  />
                  
                  <ContextMenu.Separator className="h-px bg-[#2a2a2a] my-1" />
                  
                  <MenuItem 
                    label="Disable Track"
                    onClick={() => trackHandlers(track.id).toggleDisabled()}
                  />
                  <MenuItem 
                    label="Lock Track"
                    onClick={() => trackHandlers(track.id).toggleLocked()}
                  />
                  <MenuItem label="Edit Note..." />
                  
                  <SubMenu label="Layers">
                    <MenuItem label="Add Layer..." />
                    <MenuItem label="Duplicate Layer..." />
                    <MenuItem label="Rename Layer..." />
                    <MenuItem label="Remove Layer" disabled />
                  </SubMenu>
                  
                  <ContextMenu.Separator className="h-px bg-[#2a2a2a] my-1" />
                  
                  <MenuItem 
                    label="Show / Hide Automation"
                    onClick={() => trackHandlers(track.id).toggleAutomation()}
                  />
                  <MenuItem label="Store Track Preset..." />
                  <MenuItem label="Load Track Preset..." />
                  
                  <ContextMenu.Separator className="h-px bg-[#2a2a2a] my-1" />
                  
                  <MenuItem label="Add Tracks" shortcut="T" />
                  <MenuItem label="Add Bus for Selected Channels" />
                  <MenuItem label="Add VCA for Selected Channels" />
                  
                  <ContextMenu.Separator className="h-px bg-[#2a2a2a] my-1" />
                  
                  <MenuItem label="Pack Folder" />
                  <MenuItem label="Collapse All Tracks" />
                  <MenuItem label="Remove Track Automation" />
                  <MenuItem label="Apply Track Names to Channels" />
                </ContextMenu.Content>
              </ContextMenu.Portal>
            </ContextMenu.Root>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackControl;