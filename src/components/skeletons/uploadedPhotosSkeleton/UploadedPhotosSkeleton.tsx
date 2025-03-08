import Skeleton, { SkeletonProps } from 'react-loading-skeleton'

export const UploadedPhotosSkeleton = ({ count, ...rest }: SkeletonProps) => {
  return (
    <>
      {Array.from({ length: count ?? 1 }).map((_, index) => (
        <div key={index}>
          <Skeleton {...rest} />
        </div>
      ))}
    </>
  )
}
