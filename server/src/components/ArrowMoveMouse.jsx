import ArrowTools from "./ArrowTools";
import React, { useEffect } from "react";

export default function ArrowMoveMouse({onMove, mouseSpeed})
{
  const [pressingUp, setPressingUp] = React.useState(false)
  const [pressingDown, setPressingDown] = React.useState(false)
  const [pressingLeft, setPressingLeft] = React.useState(false)
  const [pressingRight, setPressingRight] = React.useState(false)
  const pressingUpRef = React.useRef(pressingUp);
  const pressingDownRef = React.useRef(pressingDown)
  const pressingLeftRef = React.useRef(pressingLeft)
  const pressingRightRef = React.useRef(pressingRight)
  
  pressingUpRef.current = pressingUp;
  pressingDownRef.current = pressingDown;
  pressingLeftRef.current = pressingLeft;
  pressingRightRef.current = pressingRight;

  const moveAmount = 10;
  const recallAmountMS = 100;
  

  const HandleChange = () =>
  {
    //if pressing something call onMove every 1s
    
    if (pressingDownRef.current || pressingUpRef.current || pressingLeftRef.current || pressingRightRef.current)
    {
      //call onMove
      let deltaY = (pressingDownRef.current || pressingUpRef.current ? moveAmount * mouseSpeed : 0) * (pressingUpRef.current ? -1 : 1);
      let deltaX = (pressingLeftRef.current || pressingRightRef.current ? moveAmount * mouseSpeed : 0) * (pressingLeftRef.current ? -1 : 1);

      onMove(deltaX, deltaY);

      setTimeout(() => {
        HandleChange();
      }, recallAmountMS);
    }
  }
  
    
  React.useEffect(() =>
  {
    HandleChange();
  }, [pressingDown, pressingUp, pressingLeft, pressingRight])


  const HandleOnMouseDown = (key) =>
  {
    if (key === 'up') setPressingUp(true)
    if (key === 'down') setPressingDown(true)
    if (key === 'left') setPressingLeft(true)
    if (key === 'right') setPressingRight(true)
  }

  const HandleOnMouseUp = (key) =>
  {
    if (key === 'up') setPressingUp(false)
    if (key === 'down') setPressingDown(false)
    if (key === 'left') setPressingLeft(false)
    if (key === 'right') setPressingRight(false)
  }

  return (
    <ArrowTools onMouseDown={HandleOnMouseDown} onMouseUp={HandleOnMouseUp} />
  )
}