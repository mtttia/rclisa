import { contextBridge, ipcRenderer } from  'electron'

contextBridge.exposeInMainWorld('robot', {
  test :()=> {
    ipcRenderer.send('robotTest')
  }
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('app', {
  isConnected: () =>
  {
    return false;
  },
  getQrInfo: () =>
  {
    return {info:'fuckoff'};
  },
  chooseIp: (ip:any) =>
  {
    ipcRenderer.send('chooseIp', ip)
  },
})

contextBridge.exposeInMainWorld('rclisa', {
  ask: () =>
  {
    ipcRenderer.send('rc_lisa-ask')
  },
  onAnswer: (callback:any) =>
  {
    ipcRenderer.on('rc_lisa-answer', (event, arg) => {
      callback(JSON.parse(arg))
    })
  }
})