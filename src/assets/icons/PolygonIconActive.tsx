import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>
export const FilterActive = ({ className }: Props) => {
  return (
    <svg
      className={className}
      fill={'none'}
      height={'5'}
      viewBox={'0 0 8 5'}
      width={'8'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <path d={'M4 5L0.535898 0.5L7.4641 0.5L4 5Z'} fill={'white'} />
    </svg>
  )
}
