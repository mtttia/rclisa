import React from 'react'
import { Text } from '@fluentui/react-components'

export default function DeviceAlreadyConnected()
{
  return (
    <div style={{display:'flex', flexDirection:'column',"alignItems":"center","justifyContent":"center","height":"100vh"}}>
      <Text size={800}>Lisa Remote Controller</Text>
      <Text size={400}>The server is already connected to another device. Please try again later.</Text>
    </div>
  )
}