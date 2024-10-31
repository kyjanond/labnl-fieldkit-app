//@ts-expect-error: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react'
import './uiHeader.scss'
import { Typography } from '@mui/material'
import MobioIcon from '../../assets/images/Mobio_logo.svg'

interface IUiHeader {
  className?:string
}

const UiHeader = (props:IUiHeader)=>{
  return(
    <div className={props.className}>
      <img
        className='br-ui-header__logo'
        src={`${MobioIcon}?w=50&h=50&fit=crop&auto=format`}
        srcSet={`${MobioIcon}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
        alt='braille icon'
        loading="lazy"
      />
      <Typography variant='h3'>
      FIELDKIT - SENSOR BOX<br/>
      </Typography>
    </div>
  )
}

export default UiHeader