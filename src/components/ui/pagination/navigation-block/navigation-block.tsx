import s from '../pagination.module.scss'
import { NavigateButton } from '@/components/ui/pagination/navigate-button/navigate-button'
import { PaginationProps } from '@/components/ui/pagination'
import { ArrowBackIcon } from '@/assets/icons/ArrowBackIcon'
import { ArrowForwardIcon } from '@/assets/icons/ArrowForwardIcon'

type Props = {
  paginationRange: (string | number)[]
} & Pick<PaginationProps, 'currentPage' | 'onPageChange'>

export const NavigationBlock = ({ paginationRange, currentPage, onPageChange }: Props) => {
  return (
    <div className={s.buttons}>
      <NavigateButton
        active={false}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowBackIcon />
      </NavigateButton>
      {paginationRange.map((page, index) => {
        const onPageClick = (btn: number) => () => {
          onPageChange(btn)
        }

        if (typeof page !== 'number') {
          return (
            <div key={index} className={s.dots}>
              &#8230;
            </div>
          )
        }

        return (
          <NavigateButton key={index} active={page === currentPage} onClick={onPageClick(page)}>
            {page}
          </NavigateButton>
        )
      })}
      <NavigateButton
        active={false}
        disabled={currentPage === paginationRange[paginationRange.length - 1]}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ArrowForwardIcon />
      </NavigateButton>
    </div>
  )
}
