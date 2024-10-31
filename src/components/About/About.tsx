/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as React from 'react'
import './about.scss'
import { IconButton, Popover, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

export interface IAboutProps {
  className?:string,
}

const About = (props:IAboutProps)=>{
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>)=>{
    setAnchorEl(event.currentTarget)
  }
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  return(
    <div>
      <IconButton 
        className={`${props.className?props.className:''} about__btn`}
        onClick={handlePopoverOpen}
      >
        <InfoIcon />
      </IconButton>
      <Popover 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }} 
        elevation={0}
        open={open}   
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        slotProps={{paper:{variant:'outlined'}}}
      >
        <div className='about__content'>
          <Typography variant='h4'>
            Mobio FieldKit
          </Typography>
          <Typography className='about__description'>
          FieldKit is an educational and citizen science kit designed for 
          enthusiastic nature explorers. Alongside FieldScope and SensorBox, 
          this app provides an accessible and cost-effective solution for nature 
          exploration and citizen science. By utilizing your smartphone sensors 
          and additional sensors connected through the SensorBox, 
          FieldKit offers an easy way to explore, observe, and record the 
          <br/>
          For more info about the project click  <a href="https://linktr.ee/mobio_">here</a>
          </Typography>
          <br/>
          <Typography variant='h5'>
            How to
          </Typography>
          <Typography component={'ol'} className='about__how-to'>
              <li>Power on your SensorBox to begin collecting real-time data.</li>
              <li>Once powered on, click CONNECT at the top of the app.</li>
              <li>Select your SensorBox from the popup list.</li>
              <li>Now you're ready to explore!</li>
          </Typography>
          <br/>
          <Typography variant='h6'>
            Compatibility notes
          </Typography>
          <Typography component={'ul'} className='about__how-to'>
            <li>To be able to connect to the SesnorBox use a Chrome browser.</li>
            <li>If you are an iPhone user please use the <a href='https://apps.apple.com/us/app/bluefy-web-ble-browser/id1492822055'>Bluefy</a> browser.</li>
          </Typography>
          <br/>
          <Typography variant='caption'>
            Created for educational purposes. No guarantees.
          </Typography>
          <br/>
          <br/>
          {/* <GitHubButton href="https://github.com/kyjanond/microbit-explorer">View on Github</GitHubButton> */}
        </div>
      </Popover>
    </div>
  )
}

export default About