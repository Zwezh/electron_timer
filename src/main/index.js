import ElectronTimerApp from './application';
import { checkForUpdates } from './updater';

new ElectronTimerApp();

setTimeout(() => {
  checkForUpdates();
}, 2000);
