// preload.ts
import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron',
  {
    audioAPI: {
      loadAudioFile: (filePath: string) => ipcRenderer.invoke('load-audio-file', filePath),
      // Add more audio-related methods
    },
    projectAPI: {
      saveProject: (projectData: any) => ipcRenderer.invoke('save-project', projectData),
      // Add more project-related methods
    },
    // Add more API categories as needed
  }
);

// Declare the API types for TypeScript
declare global {
  interface Window {
    electron: {
      audioAPI: {
        loadAudioFile: (filePath: string) => Promise<any>;
      };
      projectAPI: {
        saveProject: (projectData: any) => Promise<void>;
      };
    };
  }
}