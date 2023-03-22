import { Certificate } from 'crypto';
import express from 'express'
const app = express()
const port = 8940
import path from 'path';
import {Server} from 'socket.io';
import { DeviceConnected, RCLisa } from './RCLisa';


export function createServer(rclisa:RCLisa)
{
  const server = app.listen(port, () =>
  {
    console.log(`listening at http://localhost:${port}`)
  })
  const io = new Server(server);
  
  const DEBUG = true;
  
  app.use("/", express.static(path.join(__dirname, './../server/build')));
  
  io.on('connection', (socket) =>
  {
    if (rclisa.isConnected)
    {
      console.log('device already connected');
      
      socket.emit("error","Device already connected")
      socket.disconnect();
      return;
    }
    else
    {
      console.log('connection accepted');
      
      let device = new DeviceConnected('Device', socket.handshake.address);
      rclisa.connect(device);
      socket.on('move', (arg) =>
      {
        console.log('move');
      })

      socket.on('DRAG', (arg) =>
      {
        let a = JSON.parse(arg)
        rclisa.drag(a.deltaX, a.deltaY);
      });

      socket.on('TAP', (arg) =>
      {
        rclisa.click();
      });

      socket.on('TEXT', (arg) =>
      {
        rclisa.type(JSON.parse(arg))
      });

      socket.on('KEY', (arg) =>
      {
        rclisa.key(JSON.parse(arg))
      });

      socket.on('RIGHT_TAP', (arg) =>
      {
        rclisa.rightClick();
      })

      socket.on('SCROLL', (arg) =>
      {
        let obj = JSON.parse(arg);
        rclisa.scroll(obj.deltaX, obj.deltaY);
      })

      socket.on('SEND_VIDEO', (arg) =>
      {
        socket.emit('VIDEO', rclisa.screenShot());
      })

      socket.on('hello', (arg) =>
      {
        console.log(arg)
      });
//GT_START, GT_STOP, GT_MOVE      
      socket.on('GT_START', (arg) =>
      {
        let { x, y } = JSON.parse(arg);
        rclisa.gtStart(x, y);
      });

      socket.on('GT_STOP', (arg) =>
      {
        rclisa.gtStop();
      });

      socket.on('GT_MOVE', (arg) =>
      {
        let {x, y} = JSON.parse(arg)
        rclisa.gtMove(x, y);
      });


      socket.on('disconnect', () =>
      {
        console.log('disconnected');
        rclisa.disconnect();
      })
    }
  });
}
