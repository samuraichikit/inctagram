import React from 'react'

type PropsType = {
  changeSelect: (value: string) => void
  className: string
  selectValue: string
}

export const CustomSelect = ({ changeSelect, className, selectValue }: PropsType) => {
  return (
    <select
      className={className}
      onChange={e => changeSelect(e.currentTarget.value)}
      value={selectValue}
    >
      <option value={'5'}>5</option>
      <option value={'10'}>10</option>
      <option value={'25'}>25</option>
      <option value={'50'}>50</option>
      <option value={'100'}>100</option>
    </select>
  )
}
