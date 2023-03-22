import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from "@fluentui/react-components";

import { TopSpeedRegular } from "@fluentui/react-icons";

import * as React from "react";

export function MouseSpeed({ speed, setSpeed })
{
  console.log(speed);

  return (
  <Menu>
    <MenuTrigger disableButtonEnhancement>
      <Button icon={< TopSpeedRegular />} >{speed}x</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem onClick={()=>setSpeed(1)}>1x</MenuItem>
        <MenuItem onClick={()=>setSpeed(2)}>2x</MenuItem>
        <MenuItem onClick={()=>setSpeed(4)}>4x</MenuItem>
        <MenuItem onClick={()=>setSpeed(8)}>8x</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>)
}