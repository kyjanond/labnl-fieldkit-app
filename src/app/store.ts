import {  applyMiddleware, configureStore, Middleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import sensorDataReducer from '../features/SensorDataView/sensorDataSlice'
import deviceInfoReducer from '../features/DeviceInfo/deviceInfoSlice'
import graphViewerReducer from '../features/GraphViewer/graphViewerSlice'
import { enableMapSet } from 'immer'

const isProduction = process.env.NODE_ENV === 'production'
const middlewares:Array<Middleware> = []

enableMapSet()

if (!isProduction) {
  const logger = createLogger(
    {
      predicate: (_getState,action)=>{
        if (
          action.type === 'sensorData/setAccelerometer' || 
          action.type === 'sensorData/setMagnetometer' ||
          action.type === 'sensorData/setTemperature' ||
          action.type === 'sensorData/setPinValues'
        ) {
          return false
        }
        return true
      },
      collapsed:true, // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
      duration: true, // print the duration of each action?
      timestamp: true, // print the timestamp with each action?
      level: 'debug' // console's level
    }
  )
  //middlewares.push(logger)
}

const store = configureStore({
  reducer: {
    sensorData:sensorDataReducer,
    deviceInfo:deviceInfoReducer,
    graphViewer: graphViewerReducer
  },
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
    middlewares.map(x=>applyMiddleware(x))
  ),
  devTools: !isProduction,
})

export type RootState = ReturnType<typeof store.getState>
export default store