import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { Storage } from './storage';
import { Timer } from './timer';
import { nanoid } from 'nanoid';
import { DateTime } from 'luxon';

export default class ElectronTimerApp {
  constructor() {
    this.timer = new Timer();
    this.storage = new Storage();
    this.initializeSubscribes();
    app.whenReady().then(() => this.initialize());
  }

  initialize() {
    this.window = new BrowserWindow({
      title: CONFIG.name,
      width: CONFIG.width,
      height: CONFIG.height,
      minWidth: CONFIG.width,
      minHeight: CONFIG.height,
      autoHideMenuBar: true,
      titleBarStyle: 'hidden',
      webPreferences: {
        worldSafeExecuteJavaScript: true,
        preload: path.join(app.getAppPath(), 'preload', 'index.js')
      }
    });
    this.window.loadFile('renderer/index.html');

    this.window.on('closed', () => {
      this.timer.onChange = null;
      this.window = null;
    });
    this.window.webContents.on('did-finish-load', () => {
      const title = this.entry && this.entry.title || '';
      this.window.webContents.send('entries', {
        time: this.timer.get() || 0,
        title,
        entries: this.storage.get('entries')
      });
    });
    this.timer.onChange = () => {
      this.window.webContents.send('tick', {
        time: this.timer.get(),
        title: this.entry.title
      });
    };
    // this.window.webContents.openDevTools({ mode: 'detach' });
  }

  initializeSubscribes() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.initialize();
      }
    });
    ipcMain.on('timer:start', (_, data) => {
      this.timer.start();
      this.entry = {
        id: nanoid(),
        duration: 0,
        title: data.title,
        project: 'none',
        createdAt: DateTime.local().toISO()
      };
    });
    ipcMain.on('timer:stop', () => {
      const duration = this.timer.stop();
      const entries = this.storage.get('entries') || [];
      this.entry = { ...this.entry, duration };
      this.storage.set('entries', [...entries, this.entry]);
      this.window.webContents.send('entries', {
        entries: this.storage.get('entries')
      });
    });
  }
}
