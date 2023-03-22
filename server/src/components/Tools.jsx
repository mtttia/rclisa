import ArrowTools from "./ArrowTools";
import ClickButton from "./ClickButtons";
import Keyboard from "./Keyboard";
import ArrowMoveMouse from "./ArrowMoveMouse";


export default function Tools({sendData, onKey, onLeft, onRight, onMove, mouseSpeed})
{

  

  return (
    <div>
      <div style={{ position: 'fixed', top: '70px', left: '0px', width: '100vw', height: 'calc(100vh - 70px - 70px)', backgroundColor: '#0d1117', color: '#fff'  }}>
        <div style={{margin:'10px', display:'flex', justifyContent:'center'}}>
          <ArrowTools onKey={onKey} />
        </div>
      </div>
      <div style={{position:'fixed', bottom:'140px', left:'0px', width:'100vw', height:'70px', backgroundColor:'#161b22', color:'white', paddingTop:'20px'}}>
        <ArrowMoveMouse onMove={onMove} mouseSpeed={mouseSpeed} />
      </div>
      <div style={{position:'fixed', bottom:'70px', left:'0px', width:'100vw', height:'70px', backgroundColor:'#161b22', color:'white'}}>
        <Keyboard onKey={onKey} />
      </div>      
      <div style={{position:'fixed', bottom:'0px', left:'0px', width:'100vw', height:'70px', backgroundColor:'#161b22', color:'white'}}>
        <ClickButton onLeft={onLeft} onRight={onRight} />
      </div>
      
    </div>
  
  )
}