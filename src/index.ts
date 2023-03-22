import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import robot from 'robotjs';
import * as de from 'dotenv'
de.config()
import { RCLisa } from './RCLisa';
import { createServer } from './server';

const rclisa = new RCLisa();
let mainWindow:BrowserWindow|null = null;

const DEBUG = process.env.MODE == "DEBUG";

createServer(rclisa);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../assets', 'icon512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  if (DEBUG) mainWindow.loadURL('http://localhost:8123');
  else
    mainWindow.loadFile(path.join(__dirname, './../client/build', 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('robotTest', (event, arg) => {
  // Speed up the mouse.
    robot.setMouseDelay(2);
    
    var twoPI = Math.PI * 2.0;
    var screenSize = robot.getScreenSize();
    var height = (screenSize.height / 2) - 10;
    var width = screenSize.width;
    
    for (var x = 0; x < width; x++)
    {
      let y = height * Math.sin((twoPI * x) / width) + height;
      robot.moveMouse(x, y);
    }
})

function sendReply()
{
  let name = rclisa.getStepTitle();
  let data = rclisa.getStepData();
  let step = rclisa.step;

  mainWindow!.webContents.send('rc_lisa-answer', JSON.stringify({ name, data, step }));
}
ipcMain.on('rc_lisa-ask', (event, arg) => {
  //rc_lisa is the name of the protocol for remote mouse controller
  sendReply();
})


ipcMain.on('chooseIp', (event, arg) =>
{
  console.log(arg);
  rclisa.setIp(arg);
  sendReply();
})