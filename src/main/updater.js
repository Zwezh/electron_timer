import { autoUpdater } from 'electron-updater';
import { dialog } from 'electron';

autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.on('updated-downloaded', () => {
  dialog
    .showMessageBox({
      type: 'info',
      title: 'Готово',
      message: 'Установить и перезапустить сейчас?',
      buttons: ['Да', 'Позже']
    })
    .then(({ response }) => {
      if (response === 0) {
        autoUpdater.quitAndInstall(false, true);
      }
    });
});
export const checkForUpdates = () => {
  autoUpdater.checkForUpdates();
  autoUpdater.on('update-available', () => {
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Доступно обновление',
        message:
          'Доступна новая версия Electron timer. Хотите установить ее сейчас?',
        buttons: ['Да', 'Нет']
      })
      .then(({ response }) => {
        if (response === 0) {
          autoUpdater.downloadUpdate();
        }
      });
  });
};
