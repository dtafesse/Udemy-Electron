const path = require('path');
const electron = require('electron');

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 550,
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    tray = new Tray(iconPath);
    tray.on('click', (event, bounds) => {
        // Click event bounds
        const { x, y } = bounds;
        
        // Window height and width
        const { height, width } = mainWindow.getBounds();

        if(mainWindow.isVisible()){
            mainWindow.hide();
        }else{
            mainWindow.setBounds({
                x: x - width / 2,
                y: process.platform === 'darwin' ? y : y - height,
                height: height,
                width: width
            })
            mainWindow.show();
        }
        
    })
});
