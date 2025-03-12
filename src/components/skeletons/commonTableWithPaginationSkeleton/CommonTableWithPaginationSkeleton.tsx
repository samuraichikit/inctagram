import Skeleton, { SkeletonProps } from 'react-loading-skeleton'

import s from './commonTableWithPaginationSkeleton.module.scss'

export const CommonTableWithPaginationSkeleton = ({ ...rest }: SkeletonProps) => {
  const classNames = {
    pagination: s.pagination,
  }

  return (
    <>
      <Skeleton {...rest} />
      <Skeleton className={classNames.pagination} height={24} />
    </>
  )
}
