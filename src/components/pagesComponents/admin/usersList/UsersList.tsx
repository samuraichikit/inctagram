import {useState} from 'react'

import {Filter} from '@/assets/icons/PolygonIcon'
import {ActionsMenu} from '@/components/pagesComponents/admin/usersList/actionMenu/ActionMenu'
import {Pagination} from '@/components/ui/pagination'
import {Select} from '@/components/ui/select'
import {SelectItem} from '@/components/ui/select/selectItem'
import {
    Table,
    TableBody,
    TableBodyCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from '@/components/ui/tables'
import {TextField} from '@/components/ui/text-field'

import s from './usersList.module.scss'

export const UserList = () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const arr = [
        {a: '123', b: '12.12.2022', c: '$10', d: '1 day'},
        {a: '123', b: '12.12.2022', c: '$10', d: '1 day'},
        {a: '123', b: '12.12.2022', c: '$10', d: '1 day'},
        {a: '123', b: '12.12.2022', c: '$10', d: '1 day'},
        {a: '123', b: '12.12.2022', c: '$10', d: '1 day'},
        {a: '123', b: '12.12.2022', c: '$10', d: '1 day'},
        {a: '123', b: '12.12.2022', c: '$10', d: '1 day'},
        {a: '123', b: '12.12.2022', c: '$10', d: '1 day'},
    ]

    return (
        <div className={s.wholeList}>
            <div className={s.searchSelect}>
                <TextField className={s.searchWidth} type={'search'}/>
                <Select className={s.selectWidth} placeholder={'Not selected'}>
                    <SelectItem value={'Blocked'}>Blocked</SelectItem>
                    <SelectItem value={'Not selected'}>Not selected</SelectItem>
                </Select>
            </div>
            <div className={s.list}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>User ID </TableHeadCell>
                            <TableHeadCell>
                                Username
                                <Filter className={s.gap}/>
                            </TableHeadCell>
                            <TableHeadCell>Profile link</TableHeadCell>
                            <TableHeadCell>
                                Date added
                                <Filter className={s.gap}/>
                            </TableHeadCell>
                            <TableHeadCell></TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arr.map(el => {
                            return (
                                <TableRow key={el.a}>
                                    <TableBodyCell>{el.a}</TableBodyCell>
                                    <TableBodyCell>{el.b}</TableBodyCell>
                                    <TableBodyCell>{el.c}</TableBodyCell>
                                    <TableBodyCell>{el.d}</TableBodyCell>
                                    <TableBodyCell className={s.actionMenu}>
                                        <ActionsMenu/>
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
