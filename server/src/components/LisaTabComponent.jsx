import { useEffect, useRef, useState } from "react"
import { Textarea } from "@fluentui/react-components";
import Keyboard from "./Keyboard";

export default function LisaTabComponent({onDrag, onTap, onRightTap, onKey, onScroll, mouseSpeed})
{
  const [initialiCoord, setInitialCoord] = useState({ x: 0, y: 0 });
  const [startDragCoord, setStartDragCoord] = useState({ x: 0, y: 0 });
  const [fingerNumber, setFingerNumber] = useState(0);
  const [initialScrollF1, setInitialScrollF1] = useState({ x: 0, y: 0 });
  const [initialScrollF2, setInitialScrollF2] = useState({ x: 0, y: 0 });
  const [currentScrollF1, setCurrentScrollF1] = useState({ x: 0, y: 0 });
  const [currentScrollF2, setCurrentScrollF2] = useState({ x: 0, y: 0 });
  const [lastSampling, setLastSampling] = useState(new Date());
  const [text, setText] = useState('');
  const [dateTextChange, setDateTextChange] = useState(new Date())

  const accuration = 0;
  const tollerance = 5;
  const textExpiredAfter = 2000; //ms

  const HandleTouchStart = (e) =>
  {
    if (e.touches.length === 1)
    {
      let touch = e.touches[0]
      setInitialCoord({ x: touch.clientX, y: touch.clientY });
      setStartDragCoord({ x: touch.clientX, y: touch.clientY });
      setFingerNumber(1);
    }
    else if (e.touches.length === 2)
    {
      setInitialScrollF1({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setInitialScrollF2({ x: e.touches[1].clientX, y: e.touches[1].clientY });
      setCurrentScrollF1({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setCurrentScrollF2({ x: e.touches[1].clientX, y: e.touches[1].clientY });
      setFingerNumber(2);
    }
  }

  const HandleTouchMove = (e) =>
  {
    
    
    if (e.touches.length == 1 && initialiCoord.x != 0 && initialiCoord.y != 0)
    {
      let touch = e.touches[0]
      let x = touch.clientX
      let y = touch.clientY

      let deltaX = x - initialiCoord.x
      let deltaY = y - initialiCoord.y

      setLastSampling(new Date());
      setInitialCoord({ x, y })
      onDrag(deltaX * mouseSpeed, deltaY * mouseSpeed)      
    }
    else if (e.touches.length == 2 && initialScrollF1.x != 0 && initialScrollF1.y != 0 && initialScrollF2.x != 0 && initialScrollF2.y != 0)
    {
      let finger1 = e.touches[0]
      let x1 = finger1.clientX
      let y1 = finger1.clientY
      let finger2 = e.touches[1]
      let x2 = finger2.clientX  
      let y2 = finger2.clientY

      setLastSampling(new Date());
      setCurrentScrollF1({ x: x1, y: y1 })
      setCurrentScrollF2({ x: x2, y: y2 })
    }
  }

  const HandleTouchEnd = (e) =>
  {
    //check if the user have just tapped, if deltax and deltay are in tollerance
    let deltaX = 0;
    let deltaY = 0;
    if (fingerNumber == 1)
    {
      deltaX = initialiCoord.x - startDragCoord.x
      deltaY = initialiCoord.y - startDragCoord.y
    }
    else if (fingerNumber == 2)
    {
      let deltaX1 = currentScrollF1.x - initialScrollF1.x
      let deltaY1 = currentScrollF1.y - initialScrollF1.y
      let deltaX2 = currentScrollF2.x - initialScrollF2.x
      let deltaY2 = currentScrollF2.y - initialScrollF2.y

      deltaX = Math.max(deltaX1, deltaX2);
      deltaY = Math.max(deltaY1, deltaY2);

      if(Math.abs(deltaX) > tollerance || Math.abs(deltaY) > tollerance)
      {
        onScroll(deltaX, deltaY);
      }
    }

    if (Math.abs(deltaX) < tollerance && Math.abs(deltaY) < tollerance)
    {
      //user have just tapped
      if (fingerNumber == 1)
      {
        onTap();
      }
      else if (fingerNumber == 2)
      {
        onRightTap();
      }
    }

    setFingerNumber(0);
  }

  


  
  return (
    <div>
      <div onTouchStart={HandleTouchStart} onTouchMove={HandleTouchMove} onTouchEnd={HandleTouchEnd} style={{ position: 'fixed', top: '70px', left: '0px', width: '100vw', height: 'calc(100vh - 70px - 70px)', backgroundColor: '#0d1117', color: '#fff', padding: '10px' }}>
          
      </div>
      <div style={{position:'fixed', bottom:'0px', left:'0px', width:'100vw', height:'70px', backgroundColor:'#161b22', color:'white'}}>
        <Keyboard onKey={onKey} />
      </div>
      
    </div>
  )
}