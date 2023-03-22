import { Text, Button, CompoundButton } from "@fluentui/react-components"

const HandleIpClick = (ip) =>
{
  window.app.chooseIp(ip)
}

export default function SelectIp({data})
{
  console.log(data)

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', color: 'white' }}>
      <Text as="h1" size={800}>Select an IP</Text>
      <Text as="p">Select an IP to connect to</Text>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          Object.keys(data).map((ip) =>
          {
            let ip_arr = data[ip]
            return (
              <CompoundButton key={ip_arr} style={{ margin: '5px' }} onClick={() => { HandleIpClick(ip_arr[0]) }} appearance="primary" secondaryContent={ip_arr[0]}>{ip}</CompoundButton>
            )
          })  
        }
      </div>
    </div>

  )
}