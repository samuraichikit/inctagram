import { ChangeEvent, useState } from 'react'

import { Filter } from '@/assets/icons/PolygonIcon'
import { FilterActive } from '@/assets/icons/PolygonIconActive'
import { useTranslation } from '@/common/hooks/useTranslation'
import { ActionsMenu } from '@/components/pagesComponents/admin/usersList/actionMenu/ActionMenu'
import { Pagination } from '@/components/ui/pagination'
import { Select } from '@/components/ui/select'
import { SelectItem } from '@/components/ui/select/selectItem'
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/tables'
import { TextField } from '@/components/ui/text-field'
import { SortDirection } from '@/services/admin/types'
import { GET_USERS } from '@/services/admin/usersPaginationService'
import { GetUsersQuery } from '@/services/admin/usersPaginationService.generated'
import { useQuery } from '@apollo/client'
import clsx from 'clsx'

import s from './usersList.module.scss'

type SortByType = 'createdAt' | 'userName'

export const UserList = () => {
  const [sortBy, setSortBy] = useState<SortByType>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { t } = useTranslation()
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS, {
    variables: {
      pageNumber: page,
      pageSize: pageSize,
      searchTerm: searchTerm,
      sortBy: sortBy,
      sortDirection: sortDirection,
    },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const handleDirectionChange = (sortParams: {
    newDirection: SortDirection
    newSortBy: SortByType
  }) => {
    setSortBy(sortParams.newSortBy)
    setSortDirection(sortParams.newDirection)
  }

  const sortUsers = (newSortBy: SortByType) => {
    const newDirection =
      sortDirection === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc

    handleDirectionChange({ newDirection, newSortBy })
  }

  return (
    <div className={s.wholeList}>
      <div className={s.searchSelect}>
        <TextField onChange={handleChange} style={{ width: '644px' }} type={'search'} />
        <Select className={s.selectWidth} placeholder={t.usersListAdmin.selectNoSelected}>
          <SelectItem value={t.usersListAdmin.selectBlocked}>
            {t.usersListAdmin.selectBlocked}
          </SelectItem>
          <SelectItem value={t.usersListAdmin.selectNoSelected}>
            {t.usersListAdmin.selectNoSelected}
          </SelectItem>
        </Select>
      </div>
      <div className={s.list}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>{t.usersListAdmin.userId}</TableHeadCell>
              <TableHeadCell>{t.usersListAdmin.userName}</TableHeadCell>
              <TableHeadCell onClick={() => sortUsers('userName')}>
                {t.usersListAdmin.profileLink}
                {SortDirection.Asc && sortBy === 'userName' ? (
                  <FilterActive
                    className={clsx(
                      sortDirection === SortDirection.Desc &&
                        sortBy === 'userName' &&
                        s.activeSortIcon
                    )}
                  />
                ) : (
                  <Filter className={s.gap} />
                )}
              </TableHeadCell>
              <TableHeadCell onClick={() => sortUsers('createdAt')}>
                {t.usersListAdmin.dateAdded}
                {SortDirection.Asc && sortBy === 'createdAt' ? (
                  <FilterActive
                    className={clsx(
                      sortDirection === SortDirection.Desc &&
                        sortBy === 'createdAt' &&
                        s.activeSortIcon
                    )}
                  />
                ) : (
                  <Filter className={s.gap} />
                )}
              </TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getUsers.users.map(el => {
              return (
                <TableRow key={el.id}>
                  <TableBodyCell>{el.id}</TableBodyCell>
                  <TableBodyCell>{`${el.profile.firstName || t.usersListAdmin.notSpecified} 
                  ${el.profile.lastName || ''}`}</TableBodyCell>
                  <TableBodyCell>{el.userName}</TableBodyCell>
                  <TableBodyCell>
                    {new Date(el.createdAt).toLocaleDateString('ru-RU')}
                  </TableBodyCell>
                  <TableBodyCell className={s.actionMenu}>
                    <ActionsMenu userId={el.id} userName={el.userName} />
                  </TableBodyCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div className={s.pagination}>
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          pageSize={pageSize}
          totalCount={100}
        />
      </div>
    </div>
  )
}
