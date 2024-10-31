import {
  createSlice
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { SensorTypeEnum } from '../SensorDataView/sensorDataSlice'

//default state
const _initialState = {
  graphs: [] as SensorTypeEnum[],
}

//SLICE
//we are creating a slice factory here to be able to use mock states in stories
export const graphViewerSliceFactory = (initialState:typeof _initialState)=>createSlice({
  name: 'graphViewer',
  initialState,
  reducers: {
    setVisibility: (state, action: {type:string, payload:{sensorType:SensorTypeEnum, isVisible:boolean}}) => {
      const set = new Set<SensorTypeEnum>(state.graphs)
      if (action.payload.isVisible){
        set.add(action.payload.sensorType)
      } else {
        set.delete(action.payload.sensorType)
      }
      state.graphs = Array.from(set)
    }
  }
})

const slice = graphViewerSliceFactory(_initialState)

//SELECTORS
export const selectGraphs = (state: RootState) => {
  return Array.from(state.graphViewer.graphs)
}


export const {
  setVisibility,
} = slice.actions

const graphViewerReducer = slice.reducer
export default graphViewerReducer
