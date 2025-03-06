import { useQueryParams } from '@/common/hooks/useQueryParams'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import s from './adminUserTabs.module.scss'

import { Payments } from '../Payment'
import { Followers } from '../followers'
import { Following } from '../following'
import { UserUploadedPhotos } from '../userUploadedPhotos'

export const AdminUserTabs = () => {
  const classNames = {
    container: s.container,
    list: s.list,
    trigger: s.trigger,
  }

  const { resetOldQueryParamsAndSetNewQueryParams, searchParams, setQueryParams } = useQueryParams()

  const handleChangeTab = (value: string) => {
    resetOldQueryParamsAndSetNewQueryParams({ tab: value })
  }

  const currentTab = searchParams?.get('tab') ?? 'uploadedPhotos'

  return (
    <Tabs className={classNames.container} onValueChange={handleChangeTab} value={currentTab}>
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
      <TabsContent value={'payments'}>
        <Payments />
      </TabsContent>
      <TabsContent value={'followers'}>
        <Followers />
      </TabsContent>
      <TabsContent value={'following'}>
        <Following />
      </TabsContent>
    </Tabs>
  )
}
