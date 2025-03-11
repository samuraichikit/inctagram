import { ComponentPropsWithoutRef, forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'svg'>

export const SortArrow = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <svg
      fill={'none'}
      height={'5'}
      ref={ref}
      viewBox={'0 0 8 5'}
      width={'8'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path d={'M4 0L7.4641 4.5H0.535898L4 0Z'} fill={'currentColor'} />
    </svg>
  )
})
