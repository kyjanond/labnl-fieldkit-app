import { useSelector } from 'react-redux'
import SensorGraph from '../../components/SensorGraph/SensorGraph.tsx'
import { selectAirRHData, selectAirTemperatureData, selectLuminousIntensityData, selectWaterTemperatureData, SensorTypeEnum } from '../SensorDataView/sensorDataSlice'
import { selectGraphs } from './graphViewerSlice.ts'

export interface IGraphViewer {
  className?: string
}


const GraphViewer = (_props:IGraphViewer)=>{
  const graphs = useSelector(selectGraphs)
  return(
    <div>
      {graphs.map(x=>{
        switch (x) {
          case SensorTypeEnum.WaterTemperature:
            return <SensorGraph key={'water_temperature'} title={'Water Temperature'} serieName={'water_temperature'} selector={selectWaterTemperatureData} />
          case SensorTypeEnum.AirRH:
            return <SensorGraph key={'air_rh'} title={'Air Relative Humidity'} serieName={'air_rh'} selector={selectAirRHData} />
          case SensorTypeEnum.AirTemperature:
            return <SensorGraph key={'air_temperature'} title={'Air Temperature'} serieName={'air_temperature'} selector={selectAirTemperatureData} />
          case SensorTypeEnum.LuminousIntensity:
            return <SensorGraph key={'luminous_intensity'} title={'Luminous Intensity'} serieName={'luminous_intensity'} selector={selectLuminousIntensityData} />
        }
      })}
    </div>
  )
}

export default GraphViewer
