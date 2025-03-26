import { Typography } from '@/components/ui/typography'
import Image from 'next/image'

import s from './FilterCard.module.scss'

import FilterImage from '../../../../../../public/filterImage.jpeg'

type Props = {
  filter: string
  onClick?: () => void
  title: string
}

export const FilterCard = ({ filter, onClick, title }: Props) => {
  return (
    <div className={s.filterCard} onClick={onClick}>
      <Image
        alt={'filter image'}
        className={s.image}
        height={108}
        src={FilterImage}
        style={{ filter }}
        width={108}
      />
      <Typography style={{ textAlign: 'center' }} variant={'regular_text_16'}>
        {title}
      </Typography>
    </div>
  )
}
