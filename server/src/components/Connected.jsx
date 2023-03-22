import { Button, Menu,
  MenuTrigger,
  MenuList,
  MenuItem, MenuPopover } from '@fluentui/react-components';
import LisaTabComponent from './LisaTabComponent'
import { MouseSpeed } from './MouseSpeed'
import { Navbar } from './Navbar'
import React, { useState } from 'react'

import { ToolboxRegular, PointScanRegular, TableRegular, FilterRegular } from '@fluentui/react-icons';
import Tools from './Tools';
import GraficTable from './GraficTable';

export function Connected({sendData, socket})
{
  const [speed, setSpeed] = useState(1);
  const [screen, setScreen] = useState(Screens.Home);

  const HandleOnDrag = (deltaX, deltaY) =>
  {
    sendData({type: "DRAG", data: {deltaX, deltaY}})
  }

  const HandleOnTap = () =>
  {
    sendData({ type: "TAP", data: "" })
  }

  const HandleOnKey = (text) =>
  {
    sendData({type: "KEY", data:text})
  }

  const HandleOnRightTap = () =>
  {
    sendData({ type: "RIGHT_TAP", data: "" })
  }

  const HandleScroll = (deltaX, deltaY) =>
  {
    sendData({type: "SCROLL", data: {deltaX, deltaY}})
  }

  const HandleGTStart = (x, y) =>
  {
    sendData({ type: "GT_START", data: { x, y } })
  }

  const HandleGTStop = () =>
  {
    sendData({ type: "GT_STOP", data: "" })
  }

  const HandleGTMove = (x, y) =>
  {
    sendData({ type: "GT_MOVE", data: { x, y } })
  }

  let component = <></>

  switch (screen)
  {
    case Screens.Home:
    default:
      component = <LisaTabComponent onDrag={HandleOnDrag} onTap={HandleOnTap} onRightTap={HandleOnRightTap} onKey={HandleOnKey} onScroll={HandleScroll} mouseSpeed={speed} />
      break;
    case Screens.GraphicsTablet:
      component = <GraficTable onTouchEnd={HandleGTStop} onTouchMove={HandleGTMove} onTouchStart={HandleGTStart} />
      break;
    case Screens.Tools:
      component = <Tools sendData={sendData} onKey={HandleOnKey} onLeft={HandleOnTap} onRight={HandleOnRightTap} onMove={HandleOnDrag} mouseSpeed={speed} />
      break;
  }

  const HandleChangeScreen = (screenSelected)=>
  {
    setScreen(screenSelected)
  }

  const ChangeScreenButton = (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button icon={<FilterRegular />} />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem icon={<PointScanRegular />} onClick={() => HandleChangeScreen(Screens.Home)}>TrackPad</MenuItem>
          <MenuItem icon={<TableRegular />} onClick={() => HandleChangeScreen(Screens.GraphicsTablet)}>graphics tablet</MenuItem>
          <MenuItem icon={<ToolboxRegular />} onClick={() => HandleChangeScreen(Screens.Tools)}>Tools</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )

  let currentScreenLabel = '';
  switch (screen)
  {
    case Screens.Home:
    default:
      currentScreenLabel = 'TrackPad'
      break;
    case Screens.Tools:
      currentScreenLabel = 'Tools'
      break;
    case Screens.GraphicsTablet:
      currentScreenLabel = 'Graphics Tablet'
      break;
  }

  return (
    <div>
      <Navbar left={<MouseSpeed speed={speed} setSpeed={setSpeed} />} right={ChangeScreenButton} text={"RC Lisa " + currentScreenLabel} />
      {component}
    </div>
  )
}

const Screens = {
  Home: 0,
  Tools: 1,
  GraphicsTablet: 2,
}