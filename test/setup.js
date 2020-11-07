const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'ElectronTimer.app', 'Contents', 'MacOS', 'ElectronTimer')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'ElectronTimer')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'ElectronTimer.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
