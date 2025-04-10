// TrackLayout.tsx
import { useState } from "react";
import TrackControl from "./trackcontrol";
import Timeline from "./timeline";

interface TimelineState {
    pixelsPerBeat: number;
    beatsPerBar: number;
    totalBars: number;
    bpm: number;
    snap: '1/1' | '1/2' | '1/4' | '1/8' | '1/16';
    playheadPosition: number;
    isPlaying: boolean;
}

function TrackLayout() {
    const [timelineState, setTimelineState] = useState<TimelineState>({
        pixelsPerBeat: 40,
        beatsPerBar: 4,
        totalBars: 16,
        bpm: 120,
        snap: '1/16',
        playheadPosition: 0,
        isPlaying: false
    });

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleTimelineScroll = (position: number) => {
        setScrollPosition(position);
    };

    const handlePlayheadChange = (position: number) => {
        setTimelineState(prev => ({ ...prev, playheadPosition: position }));
    };

    const handleBpmChange = (newBpm: number) => {
        setTimelineState(prev => ({ ...prev, bpm: newBpm }));
    };

    const handlePlayStateChange = (isPlaying: boolean) => {
        setTimelineState(prev => ({ ...prev, isPlaying }));
    };

    return (
        <div className="w-full h-full bg-[#181818] text-white flex flex-col">
            <div className="flex-1 flex overflow-hidden">
                <TrackControl
                    scrollPosition={scrollPosition}
                    playheadPosition={timelineState.playheadPosition}
                    timelineState={timelineState}
                />
                <div className="flex-1 overflow-hidden">
                    <Timeline
                        {...timelineState}
                        onScroll={handleTimelineScroll}
                        onPlayheadChange={handlePlayheadChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default TrackLayout;