"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('robot', {
    test: () => {
        electron_1.ipcRenderer.send('robotTest');
    }
    // we can also expose variables, not just functions
});
electron_1.contextBridge.exposeInMainWorld('app', {
    isConnected: () => {
        return false;
    },
    getQrInfo: () => {
        return { info: 'fuckoff' };
    },
    chooseIp: (ip) => {
        electron_1.ipcRenderer.send('chooseIp', ip);
    },
});
electron_1.contextBridge.exposeInMainWorld('rclisa', {
    ask: () => {
        electron_1.ipcRenderer.send('rc_lisa-ask');
    },
    onAnswer: (callback) => {
        electron_1.ipcRenderer.on('rc_lisa-answer', (event, arg) => {
            callback(JSON.parse(arg));
        });
    }
});
//# sourceMappingURL=preload.js.map