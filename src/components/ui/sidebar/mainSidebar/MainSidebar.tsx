import { BookmarkOutlineIcon } from '@/assets/icons/BookmarkOutline'
import { HomeOutlineIcon } from '@/assets/icons/HomeOutline'
import { MessengerIcon } from '@/assets/icons/Messenger'
import { MyProfileIcon } from '@/assets/icons/MyProfile'
import { PlusSquareOutlineIcon } from '@/assets/icons/PlusSquareOutline'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { TrendingUpOutlineIcon } from '@/assets/icons/TrendingUpOutline'

import s from './mainSidebar.module.scss'

import { Sidebar } from '..'
import { LogoutButton } from '../logoutButton'
import { SidebarItem } from '../sidebarItem'

export const MainSidebar = () => {
  const classNames = {
    mainItems: s.mainItems,
    secondaryItems: s.secondaryItems,
    sidebar: s.sidebar,
  }

  return (
    <Sidebar className={classNames.sidebar}>
      <div>
        <ul className={classNames.mainItems}>
          <SidebarItem href={'#'}>
            <HomeOutlineIcon />
            Home
          </SidebarItem>
          <SidebarItem href={'#'}>
            <PlusSquareOutlineIcon />
            Create
          </SidebarItem>
          <SidebarItem href={'#'}>
            <MyProfileIcon />
            MyProfile
          </SidebarItem>
          <SidebarItem href={'#'}>
            <MessengerIcon />
            Messenger
          </SidebarItem>
          <SidebarItem href={'#'}>
            <SearchIcon className={''} />
            Seach
          </SidebarItem>
        </ul>
        <ul className={classNames.secondaryItems}>
          <SidebarItem href={'#'}>
            <TrendingUpOutlineIcon /> Statistics
          </SidebarItem>
          <SidebarItem href={'#'}>
            <BookmarkOutlineIcon />
            Favorites
          </SidebarItem>
        </ul>
      </div>
      <LogoutButton />
    </Sidebar>
  )
}
