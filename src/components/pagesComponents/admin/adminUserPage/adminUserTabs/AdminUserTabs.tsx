import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const AdminUserTabs = () => {
  return (
    <Tabs defaultValue="uploadedPhotos">
      <TabsList>
        <TabsTrigger value={'uploadedPhotos'}>Uploaded Photos</TabsTrigger>
        <TabsTrigger value={'payments'}>Payments</TabsTrigger>
        <TabsTrigger value={'followers'}>Followers</TabsTrigger>
        <TabsTrigger value={'following'}>Following</TabsTrigger>
      </TabsList>
      <TabsContent value={'uploadedPhotos'}>uploaded photo content</TabsContent>
      <TabsContent value={'payments'}>payments content</TabsContent>
      <TabsContent value={'followers'}>followers content</TabsContent>
      <TabsContent value={'following'}>following content</TabsContent>
    </Tabs>
  )
}
