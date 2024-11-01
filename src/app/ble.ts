import { Mutex } from 'async-mutex'
import { dataViewToUint8Array } from './utilities'

const options:RequestDeviceOptions = {
  filters: [
    { namePrefix: 'MoBio_FieldKit' },
  ],
  optionalServices: [],
}

export enum CharProps {
  None = 0,
  Read = 1 << 0,
  Write = 1 << 2,
  Notify = 1 << 3,
  All = ~(~0 << 4)
}

type NotifyCb = (event:Event)=>void
type ReadCb = (uuid:string, data:DataView)=>void

export interface IBleCharacteristic {
  name:string,
  readonly uuid:string,
  readonly standardName?:string | number,  
  readonly props: CharProps,
  notifyCb?:NotifyCb
  readCb?:ReadCb
}

export interface IBleService<T extends string> {
  name:string,
  readonly uuid:string,
  readonly characteristics:Record<T,IBleCharacteristic>
}

const connectedGATTServer = {
  server:null as BluetoothRemoteGATTServer | null
}

const mutex = new Mutex()

export const isConnected = ()=>{
  return (connectedGATTServer.server && connectedGATTServer.server.connected) === true
}

export const readCharacteristic = (
  serviceUuid:string,
  characteristicUuid:string
)=>mutex.runExclusive(()=>{
  if (connectedGATTServer.server === null){
    throw new Error('Not connected to any device')
  } else if (!connectedGATTServer.server.connected) {
    throw new Error(`Not connected to device ${connectedGATTServer.server.device.id}`)
  }
  return connectedGATTServer.server.getPrimaryService(serviceUuid)
    .then(service=>{
      return service.getCharacteristic(characteristicUuid)
    })
    .then(characteristic=>{
      return characteristic.readValue()
    })
    .then(value=>{
      const byteArr = dataViewToUint8Array(value)
      console.debug(`value read ${byteArr}`)
      return value
    })
    .catch((error:Error)=>{
      throw error
    })
})


export const writeCharacteristic = (
  serviceUuid:string,
  characteristicUuid:string,
  value:ArrayBuffer
)=>mutex.runExclusive(()=>{
  if (connectedGATTServer.server === null){
    throw new Error('Not connected to any device')
  } else if (!connectedGATTServer.server.connected) {
    throw new Error(`Not connected to device ${connectedGATTServer.server.device.id}`)
  }
  return connectedGATTServer.server.getPrimaryService(serviceUuid)
    .then(service=>{
      return service.getCharacteristic(characteristicUuid)
    })
    .then(characteristic=>{
      return characteristic.writeValue(value)
    })
    .then(()=>{
      const byteArr = dataViewToUint8Array(new DataView(value))
      console.debug(`value written ${byteArr}`)
    })
    .catch((error:Error)=>{
      throw error
    })
})

export const connectDevice = (
  subscribers:IBleService<string>[], 
  disconnectedCb:(event:Event)=>void,
  connectedCb:(id:string, name:string)=>void
)=>{
  // disconnect server
  disconnectDevice()
  return mutex.runExclusive(async ()=>{
    subscribers.forEach(x=>{
      options.optionalServices?.push(x.uuid)
    })
    return navigator.bluetooth
      .requestDevice(options)
      .then(async (device:BluetoothDevice) => {
        // connect device
        device.addEventListener('gattserverdisconnected', disconnectedCb)
        if (!device.gatt){
          throw new Error('Gatt not defined')
        }
        if (device.gatt.connected){
          console.error('still connected')
        }
        return device.gatt.connect()
      })
      .then((server:BluetoothRemoteGATTServer) => {
        // get services
        connectedGATTServer.server = server
        const promises = subscribers.map(x=>server.getPrimaryService(x.uuid))
        return Promise.all(promises)
      })
      .then((services:BluetoothRemoteGATTService[]) => {
        // get characteristics
        const promises:Promise<BluetoothRemoteGATTCharacteristic>[] = []
        services.forEach(service=>{
          const sub = subscribers.find(x=>x.uuid===service.uuid)
          if (sub){
            promises.push(...Object.values(sub.characteristics).map(x=>service.getCharacteristic(x.standardName??x.uuid)))
          }
        })
        return Promise.all(promises)
      })
      .then(async (characteristics) => {
        // start notification and read values
        for (let index = 0; index < characteristics.length; index++) {
          const c = characteristics[index]
          const srvSub = subscribers.find(x=>x.uuid === c.service.uuid)
          const charSub = Object.values(srvSub?.characteristics ?? []).find(x=>x.uuid===c.uuid)
          if (!charSub){
            return
          }
          // start notification if characteristic has a cb 
          if ((charSub.props & CharProps.Notify) === CharProps.Notify && charSub.notifyCb){
            c.addEventListener(
              'characteristicvaluechanged',
              charSub.notifyCb
            )
            try {
              await c.startNotifications()
            } catch (error) {
              console.error(charSub.name,error)
            }
          } 
          // read values if characteristic has a cb 
          if((charSub.props & CharProps.Read) === CharProps.Read && charSub.readCb){
            try {
              const value = await c.readValue()
              charSub.readCb!(c.uuid, value)
            } catch (error) {
              console.error(charSub.name,error)
            }
          }
        }
        connectedCb(
          connectedGATTServer.server?.device.id ?? '',
          connectedGATTServer.server?.device.name ?? ''
        )
      })
      .catch((error:Error) => {
        throw error
      })
    
  }).catch((error:Error) => {
    console.info(error)
    //this is a cancel error
    if (error.name !== 'NotFoundError'){
      throw error 
    }
  })
}

export const disconnectDevice = ()=>mutex.runExclusive(()=>{
  if (isConnected()){
    connectedGATTServer.server!.disconnect()
    connectedGATTServer.server = null
  }
})