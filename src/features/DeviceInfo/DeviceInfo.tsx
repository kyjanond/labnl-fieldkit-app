/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as React from 'react'
import './deviceInfo.scss'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import { selectDeviceInfo } from './deviceInfoSlice'
import { writeCharacteristic } from '../../app/ble'
import { commandService } from '../../app/fieldkitBleServices'
import Button from '@mui/material/Button'

export interface IDeviceInfo {
  className?:string
  isConnected: boolean
}

const DeviceInfo = (props:IDeviceInfo)=>{
  const deviceInfo = useSelector(selectDeviceInfo)
  const handleBlinkClick = ()=>{
    writeCharacteristic(
      commandService.uuid,
      commandService.characteristics.commandData.uuid,
      new Uint8Array([1])
    )
  }
  return(
    <div className={`${props.className?props.className:' device-info'}`}>
      <Typography variant='body2'>
        ID&nbsp;&nbsp;&nbsp;: {deviceInfo.id}
      </Typography>
      <Typography variant='body2'>
        NAME&nbsp;: {deviceInfo.name}
      </Typography>
      <div className='device-info__btn-wrapper'>
        <Button 
          size="small" 
          variant='outlined' 
          disableElevation 
          disabled={!props.isConnected}
          onClick={handleBlinkClick}
        >Send</Button>
      </div>
    </div>
  )
}

export default DeviceInfo