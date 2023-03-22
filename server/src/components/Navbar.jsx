//#161b22
import React from 'react'
import { Text } from '@fluentui/react-components'

export function Navbar({text, left, right=<></>})
{
  return (
    <div style={{ position: "fixed", top: '0px', left: '0px', width: '100vw', height: '70px', background: '#161b22', color: 'white', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div>
        {left}
      </div>
      <Text style={{ alignSelf: 'center' }}>{text}</Text>
      <div>
        {right}
      </div>
    </div>
  )
}