import React from 'react';
import { Button } from '@fluentui/react-components';

export default function ClickButton({onLeft, onRight})
{
  return (
    <div style={{ display: 'flex', width: 'calc(100%)-40px', marginLeft:'20px', marginRight:'20px'}}>
      <Button style={{width:'100%'}} size='large' onClick={onLeft}>Left</Button>
      <Button style={{width:'100%'}} size='large' onClick={onRight}>Right</Button>
    </div>
  )
}