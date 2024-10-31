/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as React from 'react'
import './locationInfo.scss'
import Typography from '@mui/material/Typography'

export interface ILocationInfo {
  className?:string
  isConnected: boolean
}

const defaultLocation = {
  latitude: null as number | null,
  longitude: null as number | null
}

const LocationInfo = (props:ILocationInfo)=>{
  //const locationInfo = useSelector(selectLocationInfo)
  const [location,setLocation] = React.useState(defaultLocation)

  React.useEffect(()=>{
    getLocation()
  },[])

  const getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => setLocation({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      }), 
      err => console.log(err)
    );
    console.log(location)
  }

  return(
    <div className={`${props.className?props.className:' device-info'}`}>
      <Typography variant='body2'>
        Location: {location.latitude} : {location.longitude}
      </Typography>
    </div>
  )
}

export default LocationInfo