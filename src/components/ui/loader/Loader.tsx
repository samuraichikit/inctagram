import React, { useEffect } from 'react'

import { useAppSelector } from '@/app/store'

import s from '@/components/ui/layout/baseLayout.module.scss'

export const Loader = () => {
  const isLoadingApp = useAppSelector(state => state.app.isLoading)

  useEffect(() => {
    if (isLoadingApp) {
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isLoadingApp])

  if (!isLoadingApp) {
    return null
  }

  return (
    <>
      {isLoadingApp && (
        <div className={s.wrapperLoader}>
          <div className={s.loader}></div>
        </div>
      )}
    </>
  )
}
