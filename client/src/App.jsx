import { useEffect, useState } from 'react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { FluentProvider, teamsLightTheme, Button } from '@fluentui/react-components';
import SetupConnection from './view/setupConnection';
import SelectIp from './view/SelectIp';
import Welcome from './view/Welcome';


function App() {
  const [data, setData] = useState(null)
  const [step, setStep] = useState(null)

  const rclisa = window.rclisa;

  const HandleOnAnswer = (rcdata) =>
  {
    let data = rcdata.data;
    let step = rcdata.step;
    setData(data);
    setStep(step);
  }

  const HandleInitApp = () =>
  {
    rclisa.ask();
  }

  rclisa.onAnswer(HandleOnAnswer)

  let renderer = <></>;

  if (step != null)
  {
    switch (step)
    {
      case 0:
        renderer = <SelectIp data={data} />
        break;
      case 1:        
        renderer = <SetupConnection data={data} />
        break;
      case 2:
        renderer = <></>
        break;
    }
  }
  else
  {
    renderer = <Welcome onInit={HandleInitApp} />
  }

  return (
    <div className="App">
      <FluentProvider theme={teamsLightTheme}>
        <div style={{position:'fixed', top:'0px', left:'0px', width:'calc(100vw - 20px)', height:'100vh', backgroundColor:'#161b22', color:'#fff', padding:'10px'}}>
        {
          renderer
        }
          </div>
      </FluentProvider>
    </div>
  )
}

export default App
