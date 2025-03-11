import { SortDirection } from '@/services/admin/types'

import { QUERY_PARAMS } from '../constants'
import { useQueryParams } from './useQueryParams'

type Props<T> = {
  defaultSortBy: T
  defaultSortDirection: SortDirection
}

export const useSort = <T>({ defaultSortBy, defaultSortDirection }: Props<T>) => {
  const { searchParams, setQueryParams } = useQueryParams()

  const sortDirection =
    (searchParams?.get(QUERY_PARAMS.SORT.DIRECTION) as SortDirection) ?? defaultSortDirection
  const sortBy = (searchParams?.get(QUERY_PARAMS.SORT.BY) as T) ?? defaultSortBy

  const handleChangeSort = (sortBy: string, sortDirection: SortDirection) => {
    setQueryParams({
      [QUERY_PARAMS.SORT.BY]: sortBy,
      [QUERY_PARAMS.SORT.DIRECTION]: sortDirection,
    })
  }

  return {
    handleChangeSort,
    sortBy,
    sortDirection,
  }
}
