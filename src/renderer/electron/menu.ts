// electron/menu.ts
import { Menu, app, BrowserWindow, MenuItemConstructorOptions } from 'electron';

export function createMenu(mainWindow: BrowserWindow) {
  const isMac = process.platform === 'darwin';

  const template: MenuItemConstructorOptions[] = [
    // File Menu
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow.webContents.send('menu-new-project')
        },
        {
          label: 'New Project Template',
          accelerator: 'CmdOrCtrl+Shift+N',
          click: () => mainWindow.webContents.send('menu-new-project-template')
        },
        {
          label: 'Open Project',
          accelerator: 'CmdOrCtrl+O',
          click: () => mainWindow.webContents.send('menu-open-project')
        },
        {
          label: 'Save Project',
          accelerator: 'CmdOrCtrl+S',
          click: () => mainWindow.webContents.send('menu-save-project')
        },
        {
          label: 'Save As',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => mainWindow.webContents.send('menu-save-as')
        },
        {
          label: 'Save New Version',
          accelerator: 'CmdOrCtrl+Alt+S',
          click: () => mainWindow.webContents.send('menu-save-new-version')
        },
        { type: 'separator' },
        {
          label: 'Import Data',
          accelerator: 'CmdOrCtrl+M',
          click: () => mainWindow.webContents.send('menu-import-data')
        },
        {
          label: 'Export Data',
          accelerator: 'CmdOrCtrl+Shift+M',
          click: () => mainWindow.webContents.send('menu-export-data')
        },
        {
          label: 'Export Audio',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow.webContents.send('menu-export-audio')
        },
        { type: 'separator' },
        {
          label: 'Preferences',
          accelerator: isMac ? 'Cmd+,' : 'Ctrl+.',
          click: () => mainWindow.webContents.send('menu-preferences')
        },
        { type: 'separator' },
        { role: 'quit', accelerator: isMac ? 'Cmd+Q' : 'Alt+F4' }
      ]
    },

    // Edit Menu
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        { type: 'separator' },
        {
          label: 'Duplicate Clip',
          accelerator: 'CmdOrCtrl+D',
          click: () => mainWindow.webContents.send('menu-duplicate-clip')
        },
        {
          label: 'Duplicate Track',
          accelerator: 'CmdOrCtrl+Shift+D',
          click: () => mainWindow.webContents.send('menu-duplicate-track')
        },
        {
          label: 'Remove Track',
          accelerator: 'Shift+Delete',
          click: () => mainWindow.webContents.send('menu-remove-track')
        },
        {
          label: 'Add Track',
          accelerator: 'T',
          click: () => mainWindow.webContents.send('menu-add-track')
        },
        {
          label: 'Rename',
          accelerator: 'F2',
          click: () => mainWindow.webContents.send('menu-rename')
        },
        {
          label: 'Split',
          accelerator: 'B',
          click: () => mainWindow.webContents.send('menu-split')
        },
        {
          label: 'Ripple Trim Previous',
          accelerator: 'Q',
          click: () => mainWindow.webContents.send('menu-ripple-trim-previous')
        },
        {
          label: 'Ripple Trim Next',
          accelerator: 'W',
          click: () => mainWindow.webContents.send('menu-ripple-trim-next')
        }
      ]
    },

    // Project Menu
    {
      label: 'Project',
      submenu: [
        {
          label: 'Project Setting',
          click: () => mainWindow.webContents.send('menu-project-setting')
        },
        {
          label: 'Automation View',
          click: () => mainWindow.webContents.send('menu-automation-view')
        },
        {
          label: 'Auto Color',
          click: () => mainWindow.webContents.send('menu-auto-color')
        },
        {
          label: 'Remove Unused Track',
          click: () => mainWindow.webContents.send('menu-remove-unused-track')
        },
        {
          label: 'Marker',
          click: () => mainWindow.webContents.send('menu-marker')
        },
        {
          label: 'XML Data Editor',
          click: () => mainWindow.webContents.send('menu-xml-editor')
        },
        {
          label: 'Copy data to Project folder',
          click: () => mainWindow.webContents.send('menu-copy-to-project-folder')
        }
      ]
    },

    // Audio Menu
    {
      label: 'Audio',
      submenu: [
        {
          label: 'Processor',
          click: () => mainWindow.webContents.send('menu-processor')
        },
        {
          label: 'Fades',
          click: () => mainWindow.webContents.send('menu-fades')
        },
        {
          label: 'Latency Calculator',
          click: () => mainWindow.webContents.send('menu-latency-calculator')
        },
        {
          label: 'Force Zero Latency',
          click: () => mainWindow.webContents.send('menu-force-zero-latency')
        },
        {
          label: 'Freeze Tracks',
          click: () => mainWindow.webContents.send('menu-freeze-tracks')
        },
        {
          label: 'Selected Clip to Sampler',
          click: () => mainWindow.webContents.send('menu-clip-to-sampler')
        },
        {
          label: 'Audio Editor Preferences',
          click: () => mainWindow.webContents.send('menu-audio-editor-preferences')
        }
      ]
    },

    // Window Menu
    {
      label: 'Window',
      submenu: [
        {
          label: 'Mixer',
          accelerator: 'F3',
          click: () => mainWindow.webContents.send('menu-mixer')
        },
        {
          label: 'Timeline',
          accelerator: 'F5',
          click: () => mainWindow.webContents.send('menu-timeline')
        },
        {
          label: 'Editor',
          accelerator: 'F4',
          click: () => mainWindow.webContents.send('menu-editor')
        },
        {
          label: 'Audio Manager',
          click: () => mainWindow.webContents.send('menu-audio-manager')
        },
        {
          label: 'Plugin Manager',
          click: () => mainWindow.webContents.send('menu-plugin-manager')
        }
      ]
    },

    // Tools Menu
    {
      label: 'Tools',
      submenu: [
        {
          label: 'Command Palette',
          accelerator: 'CmdOrCtrl+Shift+P',
          click: () => mainWindow.webContents.send('menu-command-palette')
        },
        {
          label: 'Enable Keyboard Cursor Editing',
          accelerator: 'Alt+C',
          click: () => mainWindow.webContents.send('menu-keyboard-cursor-editing')
        },
        {
          label: 'Stem Extractor',
          click: () => mainWindow.webContents.send('menu-stem-extractor')
        },
        {
          label: 'Discord RPC',
          click: () => mainWindow.webContents.send('menu-discord-rpc')
        }
      ]
    },

    // Help Menu
    {
      label: 'Help',
      submenu: [
        {
          label: 'Help/Documentation',
          accelerator: 'F1',
          click: () => mainWindow.webContents.send('menu-help')
        },
        {
          label: 'About',
          click: () => mainWindow.webContents.send('menu-about')
        },
        {
          label: 'GitHub Repository',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://github.com/yourusername/yourrepo');
          }
        }
      ]
    }
  ];

  // Add macOS specific menu items
  if (isMac) {
    template.unshift({
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}