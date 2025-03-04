import { useQueryParams } from './useQueryParams'

type Props = {
  defaultPageNumber: number
  defaultPageSize: number
}

export const useCommonTablePagination = ({ defaultPageNumber, defaultPageSize }: Props) => {
  const { searchParams, setQueryParams } = useQueryParams()
  const pageNumber = Number(searchParams?.get('pageNumber') ?? defaultPageNumber)
  const pageSize = Number(searchParams?.get('pageSize') ?? defaultPageSize)

  const handleChangeCurrentPage = (value: number) => {
    setQueryParams({ pageNumber: String(value) })
  }

  const handlePageSizeChange = (pageSize: number) => {
    setQueryParams({ pageNumber: '1', pageSize: String(pageSize) })
  }

  return {
    handleChangeCurrentPage,
    handlePageSizeChange,
    pageNumber,
    pageSize,
  }
}
