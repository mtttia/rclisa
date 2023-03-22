

export default function GraficTable({onTouchStart, onTouchMove, onTouchEnd})
{
  //this component work as a graphic tablet, so detect the touch and send the data to the server

  function calculatePercentage(x, y)
  {
    let percentageX = (x ) / window.innerWidth;
    let percentageY = (y - 70) / (window.innerHeight - 70);
    return { x: percentageX, y: percentageY }
  }
  
  const HandleTouchStart = (e) =>
  {
    if(e.touches.length === 1)
    {
      let touch = e.touches[0]
      let percentage = calculatePercentage(touch.clientX, touch.clientY)
      onTouchStart(percentage.x, percentage.y)
    }
  }

  const HandleTouchMove = (e) =>
  {
    if(e.touches.length === 1)
    {
      let touch = e.touches[0]
      let percentage = calculatePercentage(touch.clientX, touch.clientY)
      onTouchMove(percentage.x, percentage.y)
    }
  }

  const HandleTouchEnd = (e) =>
  {
    if(e.touches.length === 0)
    {
      onTouchEnd()
    }
  }
  
  
  return (
    <div onTouchStart={HandleTouchStart} onTouchMove={HandleTouchMove} onTouchEnd={HandleTouchEnd} style={{ position: 'fixed', top: '70px', left: '0px', width: '100vw', height: 'calc(100vh - 70px)', backgroundColor: '#0d1117', color: '#fff', padding: '10px' }}>
          
  </div>
  )
}