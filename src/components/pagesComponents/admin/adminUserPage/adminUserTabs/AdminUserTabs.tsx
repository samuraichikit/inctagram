import { QUERY_PARAMS } from '@/common/constants'
import { useQueryParams } from '@/common/hooks/useQueryParams'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import s from './adminUserTabs.module.scss'

import { Followers } from '../followers'
import { Following } from '../following'
import { Payments } from '../payments'
import { UserUploadedPhotos } from '../userUploadedPhotos'

export const AdminUserTabs = () => {
  const classNames = {
    container: s.container,
    list: s.list,
    trigger: s.trigger,
  }

  const { resetOldQueryParamsAndSetNewQueryParams, searchParams } = useQueryParams()
  const { t } = useTranslation()

  const handleChangeTab = (value: string) => {
    resetOldQueryParamsAndSetNewQueryParams({ [QUERY_PARAMS.TAB]: value })
  }

  const currentTab = searchParams?.get(QUERY_PARAMS.TAB) ?? 'uploadedPhotos'

  return (
    <Tabs className={classNames.container} onValueChange={handleChangeTab} value={currentTab}>
      <TabsList className={classNames.list}>
        <TabsTrigger className={classNames.trigger} value={'uploadedPhotos'}>
          {t.adminUserPage.uploadedPhotos}
        </TabsTrigger>
        <TabsTrigger className={classNames.trigger} value={'payments'}>
          {t.adminUserPage.payments}
        </TabsTrigger>
        <TabsTrigger className={classNames.trigger} value={'followers'}>
          {t.adminUserPage.followers}
        </TabsTrigger>
        <TabsTrigger className={classNames.trigger} value={'following'}>
          {t.adminUserPage.following}
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
