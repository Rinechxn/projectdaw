// components/filebrowser/index.tsx
import React, { useState } from 'react';
import { IconComponent } from "@app/shared/icons";

interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'audio' | 'midi';
    children?: FileItem[];
    isOpen?: boolean;
}

interface FileBrowserProps {
    width?: number;
}

const INITIAL_FILES: FileItem[] = [
    {
        id: '1',
        name: 'Project Files',
        type: 'folder',
        children: [
            {
                id: '1-1',
                name: 'Drums',
                type: 'folder',
                children: [
                    { id: '1-1-1', name: 'kick.wav', type: 'audio' },
                    { id: '1-1-2', name: 'snare.wav', type: 'audio' },
                ]
            },
            {
                id: '1-2',
                name: 'MIDI',
                type: 'folder',
                children: [
                    { id: '1-2-1', name: 'melody.mid', type: 'midi' },
                ]
            },
        ]
    },
    {
        id: '2',
        name: 'Samples',
        type: 'folder',
        children: [
            { id: '2-1', name: 'loop1.wav', type: 'audio' },
            { id: '2-2', name: 'loop2.wav', type: 'audio' },
        ]
    }
];

const FileIcon: React.FC<{ type: FileItem['type']; isOpen?: boolean }> = ({ type, isOpen }) => {
    switch (type) {
        case 'folder':
            return (
                <IconComponent
                    type={isOpen ? 'folder-open' : 'folder'}
                    className="w-4 h-4 text-[#B3B3B3]"
                />
            );
        case 'audio':
            return (
                <IconComponent
                    type="audio-file"
                    className="w-4 h-4 text-[#B3B3B3]"
                />
            );
        case 'midi':
            return (
                <IconComponent
                    type="midi-file"
                    className="w-4 h-4 text-[#B3B3B3]"
                />
            );
        default:
            return null;
    }
};

const FileTreeItem: React.FC<{ 
    item: FileItem; 
    level: number;
    onToggle: (id: string) => void;
}> = ({ item, level, onToggle }) => {
    return (
        <>
            <div 
                className={`
                    flex items-center px-2 py-1 hover:bg-[#2D2D2D] text-xs cursor-pointer
                    ${level === 0 ? 'border-b border-[#3e3e3e] ' : ''}
                `}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                onClick={() => item.type === 'folder' && onToggle(item.id)}
            >
                <FileIcon type={item.type} isOpen={item.isOpen} />
                <span className="ml-2 text-xs">{item.name}</span>
            </div>
            {item.isOpen && item.children?.map((child) => (
                <FileTreeItem
                    key={child.id}
                    item={child}
                    level={level + 1}
                    onToggle={onToggle}
                />
            ))}
        </>
    );
};

const FileBrowser: React.FC<FileBrowserProps> = ({ width = 200 }) => {
    const [files, setFiles] = useState(INITIAL_FILES);
    const [isResizing, setIsResizing] = useState(false);
    const [browserWidth, setBrowserWidth] = useState(width);

    const toggleFolder = (id: string) => {
        const updateFiles = (items: FileItem[]): FileItem[] => {
            return items.map(item => {
                if (item.id === id) {
                    return { ...item, isOpen: !item.isOpen };
                }
                if (item.children) {
                    return { ...item, children: updateFiles(item.children) };
                }
                return item;
            });
        };
        setFiles(updateFiles(files));
    };

    const handleMouseDown = (_e: React.MouseEvent) => {
        setIsResizing(true);
        document.body.style.cursor = 'ew-resize';

        const handleMouseMove = (e: MouseEvent) => {
            const newWidth = e.clientX;
            setBrowserWidth(Math.max(150, Math.min(400, newWidth)));
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = 'default';
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div 
            className="h-full bg-[#202020] flex flex-col border-r border-[#3e3e3e] relative"
            style={{ width: browserWidth }}
        >
            {/* Header */}
            <div className="h-8 bg-[#282828] border-b border-[#3e3e3e] flex items-center px-2">
                <span className="text-xs font-medium">Files Browser</span>
            </div>

            {/* File Tree */}
            <div className={`flex-1 overflow-y-auto text-xs ${isResizing ? 'select-none' : ''}`}>
                {files.map((file) => (
                    <FileTreeItem
                        key={file.id}
                        item={file}
                        level={0}
                        onToggle={toggleFolder}
                    />
                ))}
            </div>

            {/* Resize Handle */}
            <div
                className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-[#00FF00]/50"
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

export default FileBrowser;