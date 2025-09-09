import { useState } from 'react'

import { BookmarkOutlineIcon } from '@/assets/icons/BookmarkOutline'
import { HomeOutlineIcon } from '@/assets/icons/HomeOutline'
import { MessengerIcon } from '@/assets/icons/Messenger'
import { MyProfileIcon } from '@/assets/icons/MyProfile'
import { PlusSquareOutlineIcon } from '@/assets/icons/PlusSquareOutline'
import { TrendingUpOutlineIcon } from '@/assets/icons/TrendingUpOutline'
import { ROUTES } from '@/common/constants'
import { useTranslation } from '@/common/hooks/useTranslation'
import { CreatePost } from '@/components/pagesComponents/createPost/CreatePost'
import { useMeQuery } from '@/services/auth'
import { SearchIcon, Sidebar, SidebarItem } from '@samuraichikit/inc-ui-kit'

import s from './mainSidebar.module.scss'

import { LogoutButton } from '../logoutButton'

export const MainSidebar = () => {
  const classNames = {
    mainItems: s.mainItems,
    secondaryItems: s.secondaryItems,
    sidebar: s.sidebar,
  }

  const { data } = useMeQuery()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  const userId = data?.userId ?? ''

  return (
    <Sidebar className={classNames.sidebar}>
      <div>
        <ul className={classNames.mainItems}>
          <SidebarItem href={ROUTES.FEED}>
            <HomeOutlineIcon />
            {t.mainSidebar.feed}
          </SidebarItem>
          <SidebarItem href={'#'}>
            <PlusSquareOutlineIcon
              onClick={() => {
                setIsOpen(true)
              }}
            />
            <div
              onClick={() => {
                setIsOpen(true)
              }}
            >
              {t.mainSidebar.create}
            </div>
          </SidebarItem>
          <SidebarItem href={ROUTES.PROFILE.USER_PROFILE(userId)}>
            <MyProfileIcon />
            {t.mainSidebar.myProfile}
          </SidebarItem>
          <SidebarItem href={ROUTES.MESSENGER}>
            <MessengerIcon />
            {t.mainSidebar.messenger}
          </SidebarItem>
          <SidebarItem href={ROUTES.USER_SEARCH}>
            <SearchIcon />
            {t.mainSidebar.search}
          </SidebarItem>
        </ul>
        <ul className={classNames.secondaryItems}>
          <SidebarItem href={'#'}>
            <TrendingUpOutlineIcon />
            {t.mainSidebar.statistics}
          </SidebarItem>
          <SidebarItem href={'#'}>
            <BookmarkOutlineIcon />
            {t.mainSidebar.favorites}
          </SidebarItem>
        </ul>
        <CreatePost isOpen={isOpen} isOpenChange={setIsOpen} />
      </div>
      <LogoutButton />
    </Sidebar>
  )
}
