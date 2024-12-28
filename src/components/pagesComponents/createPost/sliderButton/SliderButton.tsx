import React, { ComponentProps, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './SliderButtons.module.scss'

type SliderButtonProps = {
  children: ReactNode
  className?: string
  disabled?: ComponentProps<'button'>['disabled']
  onClick?: ComponentProps<'button'>['onClick']
  size: number
}

export const SliderButton = ({
  children,
  className,
  disabled = false,
  onClick,
  size,
}: SliderButtonProps) => {
  return (
    <button
      className={clsx(s.sliderBtn, className)}
      disabled={disabled}
      onClick={onClick}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      {children}
    </button>
  )
}
