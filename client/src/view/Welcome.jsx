import React from 'react'
import { Text, Button } from "@fluentui/react-components"

export default function Welcome({onInit})
{
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', color: 'white' }}>
      <Text as="h1" size={800}>Lisa Remote Controller</Text>
      <div style={{backgroundColor:"#010409", borderRadius:'15px', padding:'20px', margin:'20px'}}>
        <Text as="p" size={400}>
          Thank you for choosing the Lisa Remote Controller. To start using it, make sure your mobile device and the device you want to control are connected to the same network. You will also need to allow the app through your firewall.
        </Text><br></br><br></br>
        <Text as="p" size={400}>
          Click "Start" to begin using Lisa RC.
        </Text>        
      </div>
      <Button onClick={onInit} appearance="primary">Start</Button>
    </div>
  )
}