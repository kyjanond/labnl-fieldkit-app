import React, { useState } from 'react'
import './fieldkitBle.scss'
import { connectDevice, disconnectDevice } from '../../app/ble.ts'
import store from '../../app/store.ts'
import {setAirRH, setAirTemperature, setLuminousIntensity, setWaterTemperature } from '../../features/SensorDataView/sensorDataSlice.ts'
import { waterTempService, airTempService, airRHService, luminousIntensityService, commandService } from '../../app/fieldkitBleServices.ts'
import ConnectionControls from '../../components/ConnectionControls/ConnectionControls.tsx'
import DeviceInfo from '../../features/DeviceInfo/DeviceInfo.tsx'
import { useDispatch } from 'react-redux'
import ControlsSection from '../../components/ControlsSection/ControlsSection.tsx'
import Spacer from '../../components/Spacer/Spacer.tsx'
import { setDeviceName, setDeviceId } from '../../features/DeviceInfo/deviceInfoSlice.ts'
import { AlertDialogContext } from '../../components/AlertDialog/AlertDialogContext.tsx'
import SensorDataView from '../../features/SensorDataView/SensorDataView.tsx'
import GraphViewer from '../../features/GraphViewer/GraphViewer.tsx'
import LocationInfo from '../../features/LocationInfo/LocationInfo.tsx'

const isCompatible = navigator.bluetooth !== undefined

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debugNotifyCb = (e:Event)=>{
  const characteristic = e.target as BluetoothRemoteGATTCharacteristic
  const byteArr = []
  for (let index = 0; index < (characteristic.value?.byteLength || 0); index++) {
    byteArr.push(characteristic.value?.getUint8(index))
  }
  console.debug(`${characteristic.uuid}: ${byteArr}`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debugReadCb = (uuid:string, data:DataView)=>{
  const byteArr = []
  for (let index = 0; index < (data.byteLength || 0); index++) {
    byteArr.push(data.getUint8(index))
  }
  console.debug(`${uuid}: ${byteArr}`)
}

const waterTmpCb = (e:Event)=>{
  const ts = Date.now()
  const characteristic = e.target as BluetoothRemoteGATTCharacteristic
  if (characteristic.value){
    const value = characteristic.value.getInt16(0,true)
    store.dispatch(setWaterTemperature({value: value*0.01, ts: ts}))
  }
}

const airTmpCb = (e:Event)=>{
  const ts = Date.now()
  const characteristic = e.target as BluetoothRemoteGATTCharacteristic
  if (characteristic.value){
    const value = characteristic.value.getInt16(0,true)
    store.dispatch(setAirTemperature({value: value*0.01, ts: ts}))
  }
}

const airRHCb = (e:Event)=>{
  const ts = Date.now()
  const characteristic = e.target as BluetoothRemoteGATTCharacteristic
  if (characteristic.value){
    const value = characteristic.value.getInt16(0,true)
    store.dispatch(setAirRH({value: value*0.01, ts: ts}))
  }
}

const luminousIntensityCb = (e:Event)=>{
  const ts = Date.now()
  const characteristic = e.target as BluetoothRemoteGATTCharacteristic
  if (characteristic.value){
    const value = characteristic.value.getUint16(0,true)
    store.dispatch(setLuminousIntensity({value: value, ts: ts}))
  }
}

const subscriberFactory = ()=>{
  const subscribers = {
    //deviceInfoService: {...deviceInfoService},
    waterTempService: {...waterTempService},
    airTempService: {...airTempService},
    airRHService: {...airRHService},
    luminousIntensityService: {...luminousIntensityService},
    commandService: {...commandService}
  }
  //subscribers.deviceInfoService.characteristics.modelNr.readCb = modelNrCb
  //subscribers.deviceInfoService.characteristics.fwRev.readCb = fwRevCb

  subscribers.waterTempService.characteristics.tempData.notifyCb = waterTmpCb
  subscribers.airTempService.characteristics.tempData.notifyCb = airTmpCb
  subscribers.airRHService.characteristics.rhData.notifyCb = airRHCb
  subscribers.luminousIntensityService.characteristics.lumenData.notifyCb = luminousIntensityCb
  subscribers.commandService.characteristics.commandData.readCb = debugReadCb

  return subscribers
}

const FieldkitBle = ()=>{
  const spaceLength = 40
  const dispatch = useDispatch()
  const subscribers = subscriberFactory()
  const [connected,setConnected] = useState(false)
  const { handleAlertDialog } = React.useContext(AlertDialogContext)

  const connectCb = (id:string,name:string)=>{
    console.debug(`Connect success ${id}:${name}`)
    setConnected(true)
    dispatch(setDeviceName(name))
    dispatch(setDeviceId(id))
  }
  const disconnectCb = (e:Event)=>{
    console.debug(e)
    setConnected(false)
    dispatch(setDeviceName(""))
    dispatch(setDeviceId(""))
  }
  const handleConnectClick = ()=>connectDevice(
    Object.values(subscribers),
    disconnectCb,
    connectCb
  ).catch((e:Error)=>{
    handleAlertDialog(true,{
      severenity: 'error',
      message: e.message
    })
  })
  const handleDisconnectClick = ()=>{
    disconnectDevice()
  }

  if (!isCompatible){
    handleAlertDialog(true,{
      severenity: 'error',
      message: 'Your browser is unfortunatelly not supported. Try new version of MS Edge or Google Chrome.'
    })
  }
  
  return(
    <div className='fieldkit-ble'>
      <ConnectionControls 
        isConnected={connected} 
        onConnectClick={handleConnectClick}
        onDisconnectClick={handleDisconnectClick}
      />
      <Spacer length={spaceLength}/>
      <ControlsSection 
        header={'EXPERIMENT INFO'}>
        <LocationInfo isConnected={connected} />
      </ControlsSection>
      <Spacer length={spaceLength}/>
      <ControlsSection 
        header={'DEVICE INFO'}>
        <DeviceInfo isConnected={connected} />
      </ControlsSection>
      <Spacer length={spaceLength}/>
      <ControlsSection 
        header={'SENSOR DATA VIEW'}>
        <SensorDataView isConnected={connected}/>
      </ControlsSection>
      <Spacer length={spaceLength}/>
      <ControlsSection 
        header={'GRAPHS'}>
        <GraphViewer/>
      </ControlsSection>
    </div>
  )
}

export default FieldkitBle