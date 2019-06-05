const path = require('path');
const electron = require('electron');
const { sprintf } = require('sprintf-js');

const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on("ready", () => {
    let url = `file://${__dirname}/src/index.html`;
    mainWindow = new MainWindow(url);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    
    tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
    if(process.platform === 'darwin'){
        tray.setTitle(timeLeft);
    }else if (process.platform === 'win32'){
        tray.setToolTip(sprintf('Timer App %j', timeLeft));
    }
});