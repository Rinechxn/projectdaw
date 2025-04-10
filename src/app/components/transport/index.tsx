// TransportPanel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { IconComponent } from "@app/shared/icons";

interface TimeSignaturePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (timeSignature: string) => void;
}

interface TimeCode {
    hours: number;
    minutes: number;
    seconds: number;
}

interface BeatTime {
    beat: number;
    sub: number;
    tick: number;
}

const TimeSignaturePopup = ({ isOpen, onClose, onSelect }: TimeSignaturePopupProps) => {
    const commonTimeSignatures = ["4/4", "3/4", "2/4", "6/8", "12/8", "5/4"];

    return isOpen && (
        <div className="absolute top-full mt-1 bg-[#2D2D2D] rounded-md shadow-lg py-1 z-50">
            {commonTimeSignatures.map((ts) => (
                <button
                    key={ts}
                    onClick={() => {
                        onSelect(ts);
                        onClose();
                    }}
                    className="w-full px-3 py-1 hover:bg-[#3D3D3D] text-left text-sm"
                >
                    {ts}
                </button>
            ))}
        </div>
    );
};

const formatTimeCode = (time: TimeCode): string => {
    return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
};

const formatBeatTime = (beat: BeatTime): string => {
    return `${String(beat.beat).padStart(3, '0')}:${String(beat.sub).padStart(2, '0')}:${String(beat.tick).padStart(3, '0')}`;
};

const TransportPanel = () => {
    // Basic states
    const [bpm, setBpm] = useState(120);
    const [isDragging, setIsDragging] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [timeSignature, setTimeSignature] = useState("4/4");
    const [isTimeSignatureOpen, setIsTimeSignatureOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isMetronomeOn, setIsMetronomeOn] = useState(false);

    // Time states
    const [timeCode, setTimeCode] = useState<TimeCode>({ hours: 0, minutes: 0, seconds: 0 });
    const [beatTime, setBeatTime] = useState<BeatTime>({ beat: 1, sub: 1, tick: 0 });

    // Refs
    const dragStartY = useRef(0);
    const dragStartBpm = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.detail === 2) { // Double click
            setIsEditing(true);
            return;
        }
        setIsDragging(true);
        dragStartY.current = e.clientY;
        dragStartBpm.current = bpm;
        document.body.style.cursor = 'ns-resize';
    };

    const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 20 && value <= 999) {
            setBpm(value);
        }
    };

    const handleTempoBlur = () => {
        setIsEditing(false);
    };

    const handleTempoKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
        }
    };

    const handleStop = () => {
        setIsPlaying(false);
        setTimeCode({ hours: 0, minutes: 0, seconds: 0 });
        setBeatTime({ beat: 1, sub: 1, tick: 0 });
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            handleStop();
        }
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const diff = dragStartY.current - e.clientY;
                const newBpm = Math.min(999, Math.max(20, dragStartBpm.current + diff));
                setBpm(Math.round(newBpm));
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.cursor = 'default';
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setTimeCode(prev => {
                    let seconds = prev.seconds + 1;
                    let minutes = prev.minutes;
                    let hours = prev.hours;

                    if (seconds >= 60) {
                        seconds = 0;
                        minutes += 1;
                    }
                    if (minutes >= 60) {
                        minutes = 0;
                        hours += 1;
                    }

                    return { hours, minutes, seconds };
                });

                setBeatTime(prev => {
                    let tick = prev.tick + 240;
                    let sub = prev.sub;
                    let beat = prev.beat;

                    if (tick >= 960) {
                        tick = 0;
                        sub += 1;
                    }
                    if (sub >= 4) {
                        sub = 1;
                        beat += 1;
                    }
                    if (beat > 999) {
                        beat = 1;
                    }

                    return { beat, sub, tick };
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying]);

    return (
        <div className="h-10 bg-[#202020] border-b border-[#3e3e3e] px-2 flex items-center justify-between gap-2 select-none">
            {/* Left Section - Tempo and Time Signature */}
            <div className='flex items-center gap-3 h-full'>
                <div
                    className='flex items-center gap-1 cursor-ns-resize'
                    onMouseDown={handleMouseDown}
                >
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            type="number"
                            value={bpm}
                            onChange={handleTempoChange}
                            onBlur={handleTempoBlur}
                            onKeyDown={handleTempoKeyDown}
                            className="w-12 bg-[#3D3D3D] text-[#00FF00] text-sm px-1 outline-none"
                            min="20"
                            max="999"
                        />
                    ) : (
                        <span className="text-sm text-[#00FF00]">
                            {bpm.toString().padStart(3, '0')}
                        </span>
                    )}
                    <span className='text-xs text-[#B3B3B3]'>BPM</span>
                </div>

                <div className='flex items-center gap-1 relative'>
                    <button
                        onClick={() => setIsTimeSignatureOpen(!isTimeSignatureOpen)}
                        className="font-mono text-sm hover:text-[#00FF00]"
                    >
                        {timeSignature}
                    </button>
                    <TimeSignaturePopup
                        isOpen={isTimeSignatureOpen}
                        onClose={() => setIsTimeSignatureOpen(false)}
                        onSelect={setTimeSignature}
                    />
                </div>
            </div>



            {/* Center Section - Transport Controls */}
            <div className='flex items-center gap-2'>
                {/* Time Display Section */}
                <div className='flex items-center gap-4'>
                    <div className='flex flex-col -space-y-1'>
                        <span className='text-[10px] text-[#B3B3B3]'>Time</span>
                        <span className='font-mono text-sm text-white'>
                            {formatTimeCode(timeCode)}
                        </span>
                    </div>
                    <div className='flex flex-col -space-y-1'>
                        <span className='text-[10px] text-[#B3B3B3]'>Position</span>
                        <span className='font-mono text-sm text-white'>
                            {formatBeatTime(beatTime)}
                        </span>
                    </div>
                </div>
                <button
                    className="p-1 hover:bg-[#3D3D3D] rounded-sm"
                    onClick={handleStop}
                >
                    <IconComponent
                        type="rewind"
                        className="w-4 h-4 text-white"
                    />
                </button>
                <button
                    className={`p-1 hover:bg-[#3D3D3D] rounded-sm ${isPlaying ? 'bg-[#00FF00]/20' : ''}`}
                    onClick={handlePlayPause}
                >
                    <IconComponent
                        type={isPlaying ? 'pause' : 'play'}
                        className="w-4 h-4 text-[#00FF00]"
                    />
                </button>
                <button
                    className={`p-1 hover:bg-[#3D3D3D] rounded-sm ${isRecording ? 'bg-[#FF0000]/20' : ''}`}
                    onClick={() => setIsRecording(!isRecording)}
                >
                    <IconComponent
                        type="record"
                        className="w-4 h-4 text-[#FF0000]"
                    />
                </button>
                <button className="p-1 hover:bg-[#3D3D3D] rounded-sm">
                    <IconComponent
                        type="fast-forward"
                        className="w-4 h-4 text-white"
                    />
                </button>
            </div>

            {/* Right Section - Additional Controls */}
            <div className='flex items-center gap-1'>
                <button
                    className={`p-1 hover:bg-[#3D3D3D] rounded-sm ${isMetronomeOn ? 'bg-[#00FF00]/20' : ''}`}
                    onClick={() => setIsMetronomeOn(!isMetronomeOn)}
                >
                    <IconComponent
                        type="metronome"
                        className={`w-4 h-4 ${isMetronomeOn ? 'text-[#00FF00]' : 'text-[#B3B3B3]'} hover:text-white`}
                    />
                </button>
                <button
                    className={`p-1 hover:bg-[#3D3D3D] rounded-sm ${isLooping ? 'bg-[#00FF00]/20' : ''}`}
                    onClick={() => setIsLooping(!isLooping)}
                >
                    <IconComponent
                        type="loop"
                        className={`w-4 h-4 ${isLooping ? 'text-[#00FF00]' : 'text-[#B3B3B3]'} hover:text-white`}
                    />
                </button>
            </div>
        </div>
    );
};

export default TransportPanel;