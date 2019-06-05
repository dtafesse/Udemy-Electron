const electron = require('electron');

const { BrowserWindow , app } = electron;

class MainWindow extends BrowserWindow { 
    constructor(url){
        super({
            width: 350,
            height: 550,
            resizable: false,
            frame: false,
            skipTaskbar : true, //  really for status tray/bar apps - think of the Mac dock
            show: false,
            webPreferences: {
                nodeIntegration: true,
                backgroundThrottling: false
            }
        });

        this.loadURL(url);

        // really for status tray/bar apps
        this.on('blur', this.onBlur.bind(this));
    }

    onBlur(){
        this.hide();
    }
}

module.exports = MainWindow;