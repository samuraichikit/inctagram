import React from 'react'
import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

import s from '@/components/forms/generalSettings/generalSettings.module.scss'

export const SkeletonGeneralSettings = () => {
  return (
    <div className={s.blockSkeleton}>
      <div className={s.blockAvatar}>
        <Skeleton circle height={192} />
        <Skeleton height={62} />
      </div>
      <div className={s.blockInputs}>
        <Skeleton className={s.blockInputsChildren} count={4} height={32} />
        <div className={s.blockInputsCoutryAndCity}>
          <Skeleton className={s.blockInputsChildren} height={33} />
          <Skeleton className={s.blockInputsChildren} height={33} />
        </div>
        <Skeleton className={s.blockTextarea} height={84} />
      </div>
    </div>
  )
}
