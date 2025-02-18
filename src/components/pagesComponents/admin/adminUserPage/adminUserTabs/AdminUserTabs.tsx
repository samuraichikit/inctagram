import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import s from './adminUserTabs.module.scss'

import { UserUploadedPhotos } from '../userUploadedPhotos'

export const AdminUserTabs = () => {
  const classNames = {
    container: s.container,
    list: s.list,
    trigger: s.trigger,
  }

  return (
    <Tabs className={classNames.container} defaultValue={'uploadedPhotos'}>
      <TabsList className={classNames.list}>
        <TabsTrigger className={classNames.trigger} value={'uploadedPhotos'}>
          Uploaded Photos
        </TabsTrigger>
        <TabsTrigger className={classNames.trigger} value={'payments'}>
          Payments
        </TabsTrigger>
        <TabsTrigger className={classNames.trigger} value={'followers'}>
          Followers
        </TabsTrigger>
        <TabsTrigger className={classNames.trigger} value={'following'}>
          Following
        </TabsTrigger>
      </TabsList>
      <TabsContent value={'uploadedPhotos'}>
        <UserUploadedPhotos />
      </TabsContent>
      <TabsContent value={'payments'}>payments content</TabsContent>
      <TabsContent value={'followers'}>followers content</TabsContent>
      <TabsContent value={'following'}>following content</TabsContent>
    </Tabs>
  )
}
