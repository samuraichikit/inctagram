import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Pagination } from './'

export default {
  component: Pagination,
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export const Default = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  return (
    <div>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        totalCount={100}
      />
      <div style={{ marginTop: '24px' }}>
        <p>Current page: {page}</p>
        <p>Page size: {pageSize}</p>
      </div>
    </div>
  )
}
