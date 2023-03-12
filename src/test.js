//import icprenderer from electorn
const { ipcRenderer } = require('electron');

ipcRenderer.send('robotTest', 'ping');

