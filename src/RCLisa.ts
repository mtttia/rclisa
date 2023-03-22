import { getNetworkInterfaces } from './NetUtils';

//import HMAC from node
import net from  'net';
import { createHmac } from 'crypto';
import { Step, StepNames } from './Enums';
import robot from 'robotjs';


export class RCLisa
{
  /**
   * @type DeviceConnected
   */
  device:DeviceConnected|null = null;
  /**
   * @type ServerData
   */
  server:ServerData|null = null;
  onDataReceived = () => { };
  isConnected = false;
  step = 0;

  getStepTitle()
  {
    switch (this.step)
    {
      case Step.SelectIP:
        return StepNames[Step.SelectIP]
      case Step.WaitConnection:
        return StepNames[Step.WaitConnection]
      case Step.Connected:
        return StepNames[Step.Connected]
    }
  }

  getStepData()
  {
    switch (this.step)
    {
      case Step.SelectIP:
        return this.getAvailableIPs();
      case Step.WaitConnection:
        return this.getQRCodeData();
      case Step.Connected:
        return this.device;
    }
  }

  getAvailableIPs()
  {
    return getNetworkInterfaces();
  }

  getQRCodeData()
  {
    let secretHash = new SecretHash(this.server!.ip + this.server!.port, KeyManager.hashPassword).generate();
    return `http://${this.server!.ip}:${this.server!.port}/?hash=${secretHash}`;
  }

  setIp(ip:string)
  {
    this.server = new ServerData(ip, 8940);
    this.step = Step.WaitConnection;
  }

  disconnect()
  {
    this.device = null;
    this.isConnected = false;
  }

  /**
   * 
   * @param {DeviceConnected} deviceConnected 
   */
  connect(deviceConnected:DeviceConnected)
  {
    if (this.checkConnection(deviceConnected))
    {
      this.device = deviceConnected;
      this.isConnected = true;
    }  
  }

  drag(deltaX:number, deltaY:number)
  {
    //get current mouse position
    let mouse = robot.getMousePos();
    //move mouse
    let x = mouse.x + deltaX;
    let y = mouse.y + deltaY;

    console.log(x, y);
    
    
    robot.moveMouse(x, y);
  }

  click()
  {
    robot.mouseClick();
  }

  type(text:string)
  {
    robot.typeString(text);
  }

  key(key:string)
  {
    try
    {
      robot.keyTap(key);
    }catch(e){}
    
  }

  rightClick()
  {
    robot.mouseClick('right');
  }

  screenShot()
  {
    let img = robot.screen.capture(0, 0, 20, 20);
    return img.image;
  }

  scroll(deltaX: number, deltaY: number)
  {
    //use page up and page down
    if (deltaY > 0)
    {
      robot.keyTap('pageup');
    }
    else
    {
      robot.keyTap('pagedown');
    }
  }

  gtStart(x:number, y:number)
  {
    //x and y are in percentage
    let screenSize = robot.getScreenSize();
    x = screenSize.width * x;
    y = screenSize.height * y;

    robot.moveMouse(x, y);
    robot.mouseToggle('down');
  }

  gtMove(x: number, y: number)
  {
    //x and y are in percentage
    let screenSize = robot.getScreenSize();
    x = screenSize.width * x;
    y = screenSize.height * y;
    
    robot.moveMouse(x, y);
  }

  gtStop()
  {
    robot.mouseToggle('up');
  }



  /**
   * 
   * @param {DeviceConnected} deviceConnected
   * @param {string} data
   * @returns {boolean}
   * */
  checkConnection(deviceConnected:DeviceConnected)
  {
    return true;
  }
}


export class DeviceConnected
{
  name;
  ip;

  constructor(name:string, ip:string)
  {
    this.name = name;
    this.ip = ip;
  }

  static FromRowData(rowData:any)
  {
    rowData = JSON.parse(rowData);
    return new DeviceConnected(rowData.name, rowData.ip);
  }
}

export class ServerData
{
  ip;
  port;
  
  constructor(ip:string, port:number)
  {
    this.ip = ip;
    this.port = port;
  }
}

export class SecretHash
{
  data;
  password;

  constructor(data:string, password:string)
  {
    this.data = data;
    this.password = password;
  }

  generate()
  {
    //hash with hmac
    let hmac = createHmac('sha256', this.password);

    //now use hmac to hash the data
    hmac.update(this.data);
    return hmac.digest('hex');
  }

  check(data:string)
  {
    return this.generate() === data;
  }
}

export class KeyManager
{
  static hashPassword = 'vndkhsfbSFNDSJ_@àààò44243243';
}

