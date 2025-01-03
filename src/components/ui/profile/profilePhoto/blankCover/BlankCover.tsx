import { ImageOutline } from '@/assets/icons/ImageOutline'
import { clsx } from 'clsx'

import s from './BlankCover.module.scss'

type Props = {
  className?: string
  type?: 'circle' | 'square'
}

export const BlankCover = ({ className, type = 'circle' }: Props) => {
  return (
    <div className={clsx(s[type], className)}>
      <ImageOutline height={36} width={36} />
    </div>
  )
}
