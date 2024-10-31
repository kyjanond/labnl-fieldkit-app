//@ts-expect-error: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react'
import './uiFooter.scss'
import LogoLabNL from '../../assets/images/labnl-logo.9c66c725.svg'
import LogoInnovactionGym from '../../assets/images/d62521_6a3de1d0838f42ffb363205f0156e774~mv2.png'
import { Typography } from '@mui/material'

interface IUiHeader {
  className?:string
}

const UiFooter = (props:IUiHeader)=>{
  return(
    <div className={props.className}>
      <div className='ui-footer__logo-wrapper'>
        <img
          className='ui-footer__logo'
          src={`${LogoLabNL}?w=50&h=50&fit=crop&auto=format`}
          srcSet={`${LogoLabNL}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
          alt='logo labnl'
          loading="lazy"
        />
        <img
          className='ui-footer__logo'
          src={`${LogoInnovactionGym}?w=50&h=50&fit=crop&auto=format`}
          srcSet={`${LogoInnovactionGym}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
          alt='logo innovaction gym'
          loading="lazy"
        />
      </div>
      <div className='ui-footer__text-wrapper'>
        <Typography>
          Made by passionate people in MTY with love ♡
        </Typography>
      </div>
    </div>
  )
}

export default UiFooter