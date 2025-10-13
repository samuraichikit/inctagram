import { ComponentPropsWithoutRef, forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'svg'>

export const ArrowIosBackOutlineIcon = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <svg
      fill={'none'}
      height={'24'}
      ref={ref}
      viewBox={'0 0 24 24'}
      width={'24'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <g clipPath={'url(#clip0_26786_12903)'}>
        <path
          d={
            'M13.8299 19C13.6805 19.0005 13.5329 18.9675 13.3979 18.9035C13.263 18.8395 13.144 18.746 13.0499 18.63L8.21992 12.63C8.07284 12.4511 7.99243 12.2266 7.99243 11.995C7.99243 11.7634 8.07284 11.5389 8.21992 11.36L13.2199 5.36C13.3897 5.15578 13.6336 5.02736 13.898 5.00298C14.1624 4.9786 14.4257 5.06026 14.6299 5.23C14.8341 5.39974 14.9626 5.64365 14.9869 5.90808C15.0113 6.1725 14.9297 6.43578 14.7599 6.64L10.2899 12L14.6099 17.36C14.7322 17.5068 14.8099 17.6855 14.8338 17.8751C14.8576 18.0646 14.8267 18.257 14.7447 18.4296C14.6626 18.6021 14.5328 18.7475 14.3707 18.8486C14.2086 18.9497 14.021 19.0022 13.8299 19Z'
          }
          fill={'currentColor'}
        />
      </g>
      <defs>
        <clipPath id={'clip0_26786_12903'}>
          <rect fill={'currentColor'} height={'24'} width={'24'} />
        </clipPath>
      </defs>
    </svg>
  )
})
