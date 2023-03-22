import { Button, FluentProvider, teamsLightTheme, Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  Text,
  DialogActions,
  DialogContent, 
  webDarkTheme} from "@fluentui/react-components";  
import { useEffect } from "react";
//use socker.io
import io from "socket.io-client";
import { ErrorDialog } from "./components/ErrorDialog";
import { Connected } from "./components/Connected";
import { useState } from "react";
import DeviceAlreadyConnected from "./components/DeviceAlreadyConnected";

export default function App()
{
  /**
   * @type {SocketIOClient.Socket}
   */
  const [connectionError, setConnectionError] = useState(false);
  const [connected, setConnected] = useState(false);
  const [socket, setScoket] = useState(null);


  const SendData = (data) =>
  {
    if(connected && !connectionError && socket != null)
    { 
      socket.emit(data.type, JSON.stringify(data.data));
    }
  }

  useEffect(() =>
  {
    if (socket == null)
    {
      let socketUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
      let s = io(socketUrl);
      console.log();
      setScoket(s);
    
      s.on("connect", () =>
      {
        console.log("connected");
        setConnected(true)
        s.emit("hello", "world");
      })
    
      s.on('error', (error) =>
      {
        console.log('fucking error', error);
        setConnectionError(true);
      })
    }   
  }, [])

  


  return (
    <div className="App">
      <FluentProvider theme={webDarkTheme}>
        <div style={{ position: 'fixed', top: '0px', left: '0px', width: 'calc(100vw - 20px)', height: '100vh', backgroundColor: '#161b22', color: '#fff', padding: '10px' }}>
          <ErrorDialog open={connectionError} />
          {
            connected && !connectionError
              ? <Connected sendData={SendData} socket={socket} />
              : <DeviceAlreadyConnected />
          }
        </div>
      </FluentProvider>
    </div>
  )
}

