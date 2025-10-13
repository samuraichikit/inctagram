import React, { ChangeEvent, ComponentProps, useRef, useState } from 'react'

import { FilledLoupeIcon } from '@/assets/icons/FilledLoupeIcon'
import { LoupeIcon } from '@/assets/icons/LoupeIcon'
import { useOutsideClick } from '@/components/pagesComponents/createPost/service/useOutsideClick'
import { SliderButton } from '@/components/pagesComponents/createPost/sliderButton/SliderButton'
import { clsx } from 'clsx'

import s from './ZoomSettings.module.scss'

type Props = {
  imgId: number
  setZoom: (id: number, zoom: number) => void
  zoom: number
}

export const ZoomSetting = ({ imgId, setZoom, zoom }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const zoomRef = useRef<HTMLDivElement>(null)

  useOutsideClick(zoomRef, () => setIsActive(false))

  const zoomChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setZoom(imgId, +e.target.value)
  }

  return (
    <div>
      <div className={clsx(s.zoomBlock, !isActive && s.hide)} ref={zoomRef}>
        <input
          className={s.range}
          max={3}
          min={1}
          onChange={zoomChangeHandler}
          step={0.1}
          type={'range'}
          value={zoom}
        />
      </div>
      <SizeBtn isActive={isActive} onClick={() => setIsActive(value => !value)} />
    </div>
  )
}

const SizeBtn = (props: { isActive: boolean; onClick?: ComponentProps<'button'>['onClick'] }) => {
  return (
    <SliderButton
      className={clsx(s.sizeBtn, props.isActive && s.active)}
      onClick={props.onClick}
      size={36}
    >
      {props.isActive ? <FilledLoupeIcon /> : <LoupeIcon />}
    </SliderButton>
  )
}
