import { ComponentPropsWithoutRef, forwardRef } from 'react'

type Props = { className?: string } & ComponentPropsWithoutRef<'svg'>

export const Avatar = forwardRef<SVGSVGElement, Props>(
  ({ className, height, width, ...props }: Props, ref) => {
    return (
      <svg
        className={className}
        fill={'currentColor'}
        height={height}
        ref={ref}
        stroke={'#9a9a9a'}
        strokeWidth={'0.32'}
        viewBox={'0 0 16 16'}
        width={width}
        xmlns={'http://www.w3.org/2000/svg'}
        {...props}
      >
        <g id={'SVGRepo_bgCarrier'} strokeWidth={'0'} />

        <g id={'SVGRepo_tracerCarrier'} strokeLinecap={'round'} strokeLinejoin={'round'} />

        <g id={'SVGRepo_iconCarrier'}>
          {' '}
          <path
            d={
              'm 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0'
            }
            fill={'currentColor'}
          />{' '}
        </g>
      </svg>
    )
  }
)
