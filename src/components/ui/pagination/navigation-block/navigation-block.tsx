import { FC } from 'react'
import s from '../pagination.module.scss'
import { NavigateButton } from '@/components/ui/pagination/navigate-button/navigate-button'
import { PaginationProps } from '@/components/ui/pagination'

type Props = {
  paginationRange: (string | number)[]
} & Pick<PaginationProps, 'currentPage' | 'onPageChange'>

export const NavigationBlock: FC<Props> = ({ paginationRange, currentPage, onPageChange }) => {
  return (
    <div className={s.buttons}>
      <NavigateButton
        active={false}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {'❮'}
      </NavigateButton>
      {paginationRange.map((btn, index) => {
        const onPageClick = (btn: number) => () => {
          onPageChange(btn)
        }

        if (typeof btn !== 'number') {
          return (
            <div key={index} className={s.dots}>
              ...
            </div>
          )
        }

        return (
          <NavigateButton key={index} active={btn === currentPage} onClick={onPageClick(btn)}>
            {btn}
          </NavigateButton>
        )
      })}
      <NavigateButton
        active={false}
        disabled={currentPage === paginationRange[paginationRange.length - 1]}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {'❯'}
      </NavigateButton>
    </div>
  )
}
