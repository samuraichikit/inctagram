import { useState } from 'react'

import { Filter } from '@/assets/icons/PolygonIcon'
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
import { GET_USERS } from '@/services/admin/usersPaginationService'
import { GetUsersQuery } from '@/services/admin/usersPaginationService.generated'
import { useQuery } from '@apollo/client'

import s from './usersList.module.scss'

export const UserList = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const { t } = useTranslation()
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS, {
    variables: {
      pageNumber: page,
      pageSize: pageSize,
    },
  })

  return (
    <div className={s.wholeList}>
      <div className={s.searchSelect}>
        <TextField className={s.searchWidth} type={'search'} />
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
              <TableHeadCell>
                {t.usersListAdmin.userName}
                <Filter className={s.gap} />
              </TableHeadCell>
              <TableHeadCell>{t.usersListAdmin.profileLink}</TableHeadCell>
              <TableHeadCell>
                {t.usersListAdmin.dateAdded}
                <Filter className={s.gap} />
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
                    <ActionsMenu />
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
