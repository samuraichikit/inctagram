import s from './sidebar.module.scss'

import { LogoutButton } from './logoutButton'

export const Sidebar = () => {
  return (
    <aside className={s.aside}>
      <LogoutButton />
    </aside>
  )
}
