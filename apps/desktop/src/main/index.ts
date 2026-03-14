import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, BrowserWindow, ipcMain } from 'electron';
import { createBootstrapSnapshot } from '@hennya/shared';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rendererDist = join(__dirname, '../renderer');
const indexHtml = join(rendererDist, 'index.html');
const preloadPath = join(__dirname, '../preload/index.js');

function createMainWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1180,
    minHeight: 760,
    backgroundColor: '#ece6db',
    title: 'Hennya',
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    window.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    window.loadFile(indexHtml);
  }

  return window;
}

app.whenReady().then(() => {
  ipcMain.handle('app:get-bootstrap-data', async () => {
    return createBootstrapSnapshot();
  });

  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});