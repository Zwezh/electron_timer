import { autoUpdater } from 'electron-updater';

export const checkForUpdates = () => {
  autoUpdater.logger = require('electron-log');
  autoUpdater.logger.transports.file.level = 'info';
  autoUpdater.checkForUpdatesAndNotify();
};
