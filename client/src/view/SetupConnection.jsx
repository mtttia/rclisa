import { Text } from "@fluentui/react-components";
import { useEffect } from "react";
import QRCode from "qrcode";

export default function SetupConnection({data})
{
  useEffect(() =>
  {
    var canvas = document.getElementById('qrcodecanvas')

    QRCode.toCanvas(canvas, data)

  })

  return (
    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
      <Text as="h1" size={800}>Connect a device</Text>
      <Text as="p">To connect a new device scan the QR Code withe the mobile device</Text>
      <canvas id="qrcodecanvas"></canvas>
    </div>
  )
}