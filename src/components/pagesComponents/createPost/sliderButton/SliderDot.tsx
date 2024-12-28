import React, { ComponentProps } from 'react'

import { clsx } from 'clsx'

import s from './SliderButtons.module.scss'

type SliderDotProps = {
  isActive?: boolean
  onClick?: ComponentProps<'button'>['onClick']
}

export const SliderDot = ({ isActive, onClick }: SliderDotProps) => {
  return (
    <button className={clsx(s.sliderDot, isActive && s.active)} onClick={onClick}>
      •
    </button>
  )
}
