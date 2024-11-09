import s from './publicPage.module.scss'

import { TotalUsers } from './totalUsers'

type Props = {
  totalUsers: number
}

export const PublicPage = ({ totalUsers }: Props) => {
  const classNames = {
    container: s.container,
  }

  return (
    <div className={classNames.container}>
      <TotalUsers totalUsers={totalUsers} />
    </div>
  )
}
