import {
  createSlice
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export enum SensorTypeEnum {
  WaterTemperature,
  AirTemperature,
  AirRH,
  LuminousIntensity
}

export interface ISensorValue {
  value: number | null,
  ts: number
}

//default state
const _initialState = {
  waterTemperature: {value:null,ts:Date.now()} as ISensorValue,
  airTemperature: {value:null,ts:Date.now()} as ISensorValue,
  airRh: {value:null,ts:Date.now()} as ISensorValue,
  luminousIntensity: {value:null,ts:Date.now()} as ISensorValue,
}

//SLICE
//we are creating a slice factory here to be able to use mock states in stories
export const sensorDataSliceFactory = (initialState:typeof _initialState)=>createSlice({
  name: 'sensorData',
  initialState,
  reducers: {
    setWaterTemperature: (state, action: {type:string, payload:typeof _initialState.waterTemperature}) => {
      state.waterTemperature = action.payload
    },
    setAirTemperature: (state, action: {type:string, payload:typeof _initialState.waterTemperature}) => {
      state.airTemperature = action.payload
    },
    setAirRH: (state, action: {type:string, payload:typeof _initialState.waterTemperature}) => {
      state.airRh = action.payload
    },
    setLuminousIntensity: (state, action: {type:string, payload:typeof _initialState.waterTemperature}) => {
      state.luminousIntensity = action.payload
    },
  }
})

const slice = sensorDataSliceFactory(_initialState)

//SELECTORS

export const selectWaterTemperatureData = (state: RootState) => {
  return state.sensorData.waterTemperature
}

export const selectAirTemperatureData = (state: RootState) => {
  return state.sensorData.airTemperature
}

export const selectAirRHData = (state: RootState) => {
  return state.sensorData.airRh
}

export const selectLuminousIntensityData = (state: RootState) => {
  return state.sensorData.luminousIntensity
}


export const {
  setAirRH,
  setAirTemperature,
  setWaterTemperature,
  setLuminousIntensity
} = slice.actions

const sesnsorDataReducer = slice.reducer
export default sesnsorDataReducer
