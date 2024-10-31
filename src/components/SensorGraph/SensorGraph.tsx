/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as React from 'react'
import './sensorGraph.scss'
import Chart, { Props as ApexProps } from "react-apexcharts";
import apexchart from "apexcharts";
import { useSelector } from 'react-redux';
import { zeroPad } from '../../app/utilities';

const MAX_SAMPLES = 15

export interface ISensorGraphProps {
  title: string,
  serieName:string,
  selector: (state:never)=>{value:number | null, ts:number}
}

interface IDatapoint {
  x:number | null,
  y:number | null
}


const defaultData:IDatapoint = {
  x: Date.now(),
  y: null
}

const SensorGraph = (props: ISensorGraphProps) => {
  const data = useSelector(props.selector)
  const dataRef = React.useRef(defaultData);
  const [datapoint, setDatapoint] = React.useState(defaultData)
  const [serieData, setSerieData] = React.useState([defaultData])
  
  const periodicUpdate = ()=>{
      if (!dataRef.current.y){
        return;
      }
      const newData = {
        x:Date.now(),
        y:dataRef.current.y
      }
      setDatapoint(newData);
  }

  React.useEffect(()=>{
    console.debug(`START automatic graph updates: ${props.serieName}`) 
    const intervalId = window.setInterval(periodicUpdate,1000);
    return () => {
      console.debug(`STOP automatic graph updates: ${props.serieName}`)
      window.clearInterval(intervalId)
    };
  },[])

  React.useEffect(()=>{
    if (serieData.length>MAX_SAMPLES){
      setSerieData([
        ...serieData.slice(1),
        datapoint
      ])
    } else {
      setSerieData([
        ...serieData,
        datapoint
      ])
    }
    const series = [{
      name: props.serieName,
      data: serieData
    }]
    console.debug(props.serieName)
    const chart = apexchart.getChartByID(props.serieName)
    if (chart){
      chart.updateSeries(series)
    }
  },[datapoint])

  React.useEffect(()=>{
    const newData = {
      x:data.ts,
      y:data.value
    }
    dataRef.current = newData
    //setDatapoint(newData);
  },[data])

  const options:ApexProps = {
    chart: {
      id: props.serieName,
      type: 'line',
      fontFamily: 'IBM Plex Mono',
      selection: {
        enabled: false
      },
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 900
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    noData: {
      text: "Data Not Availible",
    },
    grid: {
      xaxis: {
          lines: {
              show: true
          }
      },   
      yaxis: {
          lines: {
              show: true
          }
      },  
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      colors: ['#000000'],
      width: 1,
    },
    title: {
      text: props.title,
      align: 'left',
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        color:  '#263238'
      },
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false,
      },
      crosshairs: {
        enabled: false,
      },
      labels: {
        //format: 'HH:mm:ss',
        formatter: (_value: number, timestamp:number) => {
          const ts = new Date(0);
          ts.setUTCMilliseconds(timestamp);
          return `${zeroPad(ts.getHours(),2)}:${zeroPad(ts.getMinutes(),2)}:${zeroPad(ts.getSeconds(),2)}`
        }, 
      }
    },
    yaxis: {
      decimalsInFloat:2,
      tooltip: {
        enabled: false,
      },
      crosshairs: {
        enabled: false,
      },
    },
    legend: {
      show: true
    },
    tooltip: {
      enabled: false,
    }
  }
  
  return (
    <span className={`sensor-graph`}>
      <Chart
        options={options} series={[]}
      />
    </span>
  )
}
export default SensorGraph