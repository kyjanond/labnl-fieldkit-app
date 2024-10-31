/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useDispatch, useSelector } from 'react-redux'
import { selectAirTemperatureData, selectWaterTemperatureData, selectAirRHData, selectLuminousIntensityData, ISensorValue, SensorTypeEnum } from './sensorDataSlice'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { selectGraphs, setVisibility } from '../GraphViewer/graphViewerSlice'



interface ISensorData {
  title: string
  data: ISensorValue
  disable: boolean
  unit: string
  onClick:()=>void
}


const SensorData = (props:ISensorData)=>{
  return(
    <span>
      <Typography variant='body2'>
      <Button 
          size="small" 
          variant='outlined' 
          disableElevation 
          disabled={props.disable}
          onClick={props.onClick}
        >GRAPH</Button>&nbsp; 
        {props.title}: {props.data.value?.toFixed(1) ?? 'null'} {props.unit}
        
      </Typography>
      
    </span>
    
  )
}

export interface ISensorDataViewProps {
  className?:string,
  isConnected:boolean
} 

const SensorDataView = (props:ISensorDataViewProps)=>{
  const waterTemperature = useSelector(selectWaterTemperatureData)
  const airTemperature = useSelector(selectAirTemperatureData)
  const airRH = useSelector(selectAirRHData) 
  const luminousIntensity = useSelector(selectLuminousIntensityData)
  
  const dispatch = useDispatch()
  const graphVisibility = useSelector(selectGraphs)

  const handleClick = (graph:SensorTypeEnum)=>{
    const isVisible = graphVisibility.includes(graph)
    const newState = {sensorType:graph,isVisible:!isVisible}
    console.debug(newState)
    dispatch(setVisibility(newState))
  }
  return(
    <div className={`${props.className?props.className:''} sensor-data-view`}>
      <SensorData 
      title={'water temperature'} 
      data={waterTemperature} 
      disable={false} 
      unit='°C'
      onClick={()=>handleClick(SensorTypeEnum.WaterTemperature)}/>
      <SensorData 
      title={'air temperature'} 
      data={airTemperature} 
      disable={false} 
      unit='°C'
      onClick={()=>handleClick(SensorTypeEnum.AirTemperature)}/>
      <SensorData 
      title={'air humidity'} 
      data={airRH} 
      disable={false} 
      unit='%'
      onClick={()=>handleClick(SensorTypeEnum.AirRH)}/>
      <SensorData 
      title={'luminous intensity'} 
      data={luminousIntensity} 
      disable={false} 
      unit='lux'
      onClick={()=>handleClick(SensorTypeEnum.LuminousIntensity)}/>
    </div>
  )
}

export default SensorDataView