"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const robotjs_1 = __importDefault(require("robotjs"));
const de = __importStar(require("dotenv"));
de.config();
const RCLisa_1 = require("./RCLisa");
const server_1 = require("./server");
const rclisa = new RCLisa_1.RCLisa();
let mainWindow = null;
const DEBUG = process.env.MODE == "DEBUG";
(0, server_1.createServer)(rclisa);
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
const createWindow = () => {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        icon: path_1.default.join(__dirname, '../assets', 'icon512.png'),
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });
    // and load the index.html of the app.
    if (DEBUG)
        mainWindow.loadURL('http://localhost:8123');
    else
        mainWindow.loadFile(path_1.default.join(__dirname, './../client/build', 'index.html'));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
electron_1.ipcMain.on('robotTest', (event, arg) => {
    // Speed up the mouse.
    robotjs_1.default.setMouseDelay(2);
    var twoPI = Math.PI * 2.0;
    var screenSize = robotjs_1.default.getScreenSize();
    var height = (screenSize.height / 2) - 10;
    var width = screenSize.width;
    for (var x = 0; x < width; x++) {
        let y = height * Math.sin((twoPI * x) / width) + height;
        robotjs_1.default.moveMouse(x, y);
    }
});
function sendReply() {
    let name = rclisa.getStepTitle();
    let data = rclisa.getStepData();
    let step = rclisa.step;
    mainWindow.webContents.send('rc_lisa-answer', JSON.stringify({ name, data, step }));
}
electron_1.ipcMain.on('rc_lisa-ask', (event, arg) => {
    //rc_lisa is the name of the protocol for remote mouse controller
    sendReply();
});
electron_1.ipcMain.on('chooseIp', (event, arg) => {
    console.log(arg);
    rclisa.setIp(arg);
    sendReply();
});
//# sourceMappingURL=index.js.map