import {
  createSlice
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

//default state
const _initialState = {
  id: '',
  name: '',
}

//SLICE
//we are creating a slice factory here to be able to use mock states in stories
export const locationInfoSliceFactory = (initialState:typeof _initialState)=>createSlice({
  name: 'locationInfo',
  initialState,
  reducers: {
    setDeviceId: (state, action: {type:string, payload:string}) => {
      state.id = action.payload
    },
    setDeviceName: (state, action: {type:string, payload:string}) => {
      state.name = action.payload
    },
  }
})

const slice = locationInfoSliceFactory(_initialState)

//SELECTORS
export const selectLocationInfo = (state: RootState) => {
  return state.locationInfo
}


export const {
  setDeviceName,
  setDeviceId,
} = slice.actions

const locationInfoReducer = slice.reducer
export default locationInfoReducer
