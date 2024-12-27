import { useState } from 'react'

import { BookmarkOutlineIcon } from '@/assets/icons/BookmarkOutline'
import { HomeOutlineIcon } from '@/assets/icons/HomeOutline'
import { MessengerIcon } from '@/assets/icons/Messenger'
import { MyProfileIcon } from '@/assets/icons/MyProfile'
import { PlusSquareOutlineIcon } from '@/assets/icons/PlusSquareOutline'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { TrendingUpOutlineIcon } from '@/assets/icons/TrendingUpOutline'
import { useTranslation } from '@/common/hooks/useTranslation'
import { CreatePost } from '@/components/pagesComponents/createPost/CreatePost'
import { useMeQuery } from '@/services/auth'
import { useRouter } from 'next/router'

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

  const { data } = useMeQuery()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  return (
    <Sidebar className={classNames.sidebar}>
      <div>
        <ul className={classNames.mainItems}>
          <SidebarItem href={'#'}>
            <HomeOutlineIcon />
            {t.mainSidebar.home}
          </SidebarItem>
          <SidebarItem href={'#'}>
            <PlusSquareOutlineIcon
              onClick={() => {
                setIsOpen(true)
              }}
            />
            <div onClick={() => {
              setIsOpen(true)
            }}>{t.mainSidebar.create}</div>
          </SidebarItem>
          <SidebarItem href={`/profile/${data?.userId}`}>
            <MyProfileIcon />
            {t.mainSidebar.myProfile}
          </SidebarItem>
          <SidebarItem href={'#'}>
            <MessengerIcon />
            {t.mainSidebar.messenger}
          </SidebarItem>
          <SidebarItem href={'#'}>
            <SearchIcon className={''} />
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
