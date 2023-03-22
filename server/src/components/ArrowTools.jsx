import { Button } from "@fluentui/react-components";
import { ArrowDownRegular, ArrowLeftRegular, ArrowRightRegular, ArrowUpRegular } from "@fluentui/react-icons";


export default function ArrowTools({ onKey = () => { }, onMouseDown = () => { }, onMouseUp = () => { } })
{
  return (
    <div style={{maxWidth:'500px', width:'100%'}}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button icon={<ArrowUpRegular />} onClick={() => onKey('up')} onMouseDown={()=>{onMouseDown('up')}} onMouseUp={()=>{onMouseUp('up')}} size='large' />
        <Button icon={<ArrowDownRegular />} onClick={() => onKey('down')} onMouseDown={()=>{onMouseDown('down')}} onMouseUp={()=>{onMouseUp('down')}} size='large' />
        <Button icon={<ArrowLeftRegular />} onClick={() => onKey('left')} onMouseDown={()=>{onMouseDown('left')}} onMouseUp={()=>{onMouseUp('left')}} size='large' />
        <Button icon={<ArrowRightRegular />} onClick={() => onKey('right')} onMouseDown={()=>{onMouseDown('right')}} onMouseUp={()=>{onMouseUp('right')}} size='large' />
      </div>
    </div>
  )
}