import { Textarea } from "@fluentui/react-components"

export default function Keyboard({onKey})
{
  const HandleTextChange = (e) => 
  {
    let text = e.target.value;

    if (text.length > 0)
    {
      let lastChar = text[text.length - 1];
      onKey(lastChar);
    }
  }
 

  const HandleKey = (e) =>
  {
    //send it as onKey
    // alert(e.key + ", " + e.code + ", " + e.keyCode)

    if (e.key == 'Backspace')
    {
      onKey(e.key.toLowerCase())

    }
    
  }

  return (
    <div>
      <Textarea onKeyDown={HandleKey} style={{ width: 'calc(100% - 40px)', margin: '20px', height: '40px', marginTop: '15px' }} value={""} onChange={HandleTextChange} />
    </div>

  )
}