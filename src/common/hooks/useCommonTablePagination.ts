import { QUERY_PARAMS } from '../constants'
import { useQueryParams } from './useQueryParams'

type Props = {
  defaultPageNumber: number
  defaultPageSize: number
}

export const useCommonTablePagination = ({ defaultPageNumber, defaultPageSize }: Props) => {
  const { searchParams, setQueryParams } = useQueryParams()
  const pageNumber = Number(
    searchParams?.get(QUERY_PARAMS.PAGINATION.PAGE_NUMBER) ?? defaultPageNumber
  )
  const pageSize = Number(searchParams?.get(QUERY_PARAMS.PAGINATION.PAGE_SIZE) ?? defaultPageSize)

  const handleChangeCurrentPage = (value: number) => {
    setQueryParams({ pageNumber: String(value) })
  }

  const handlePageSizeChange = (pageSize: number) => {
    setQueryParams({ pageNumber: String(defaultPageNumber), pageSize: String(pageSize) })
  }

  return {
    handleChangeCurrentPage,
    handlePageSizeChange,
    pageNumber,
    pageSize,
  }
}
