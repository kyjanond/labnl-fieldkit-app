import { IBleService, CharProps, IBleCharacteristic } from './ble'

export const parseUuid = (uuidString:string)=>{
  const uuid = uuidString.replace(
    /(.{8})(.{4})(.{4})(.{4})(.{12})/g,
    '$1-$2-$3-$4-$5',
  ).toLowerCase()
  return uuid
}

const temperatureCharacteristic:IBleCharacteristic = {
  name:'TEMP_DATA',
  standardName: "temperature",
  uuid:"00002a6e-0000-1000-8000-00805f9b34fb",
  props: CharProps.Read | CharProps.Notify
}

const rhCharacteristic:IBleCharacteristic = {
  name:'RH_DATA',
  standardName: "humidity",
  uuid:"00002a6f-0000-1000-8000-00805f9b34fb",
  props: CharProps.Read | CharProps.Notify
}

const luminousIntensityCharacteristic:IBleCharacteristic = {
  name:'LUX_DATA',
  standardName: 0x2b01,
  uuid:"00002b01-0000-1000-8000-00805f9b34fb",
  props: CharProps.Read | CharProps.Notify
}

const commandCharacteristic:IBleCharacteristic = {
  name:'CMD_DATA',
  uuid:"2575734d-0104-4bdd-a05a-fdbc29031fd3",
  props: CharProps.Read | CharProps.Notify
}

export const waterTempService:IBleService<'tempData'> = {
  name: 'WATER_TEMP_SERVICE',
  uuid: parseUuid('2575734d00004bdda05afdbc29031fd3'),
  characteristics: {
    tempData:{...temperatureCharacteristic}
  }
}

export const airTempService:IBleService<'tempData'> = {
  name: 'AIR_TEMP_SERVICE',
  uuid: parseUuid('2575734d00014bdda05afdbc29031fd3'),
  characteristics: {
    tempData:{...temperatureCharacteristic}
  }
}

export const airRHService:IBleService<'rhData'> = {
  name: 'AIR_RH_SERVICE',
  uuid: parseUuid('2575734d00024bdda05afdbc29031fd3'),
  characteristics: {
    rhData:{...rhCharacteristic}
  }
}


export const luminousIntensityService:IBleService<'lumenData'> = {
  name: 'LUMINOUS_INTENSITY_SERVICE',
  uuid: parseUuid('2575734d00034bdda05afdbc29031fd3'),
  characteristics: {
    lumenData:{...luminousIntensityCharacteristic}
  }
}

export const commandService:IBleService<'commandData'> = {
  name: 'COMMAND_SERVICE',
  uuid: parseUuid('2575734d00044bdda05afdbc29031fd3'),
  characteristics: {
    commandData:{...commandCharacteristic}
  }
}
