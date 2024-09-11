import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'

const meta = {
  argTypes: {},
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/ui/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const TabsDefault: Story = {
  args: {
    children: (
      <Tabs>
        <TabsList>
          <TabsTrigger value={'tab1'}>tab1</TabsTrigger>
          <TabsTrigger value={'tab2'}>tab2</TabsTrigger>
          <TabsTrigger value={'tab3'}>tab3</TabsTrigger>
        </TabsList>
        <TabsContent value={'tab1'}>{'content 1'}</TabsContent>
        <TabsContent value={'tab2'}>{'content 2'}</TabsContent>
        <TabsContent value={'tab3'}>{'content 3'}</TabsContent>
      </Tabs>
    ),
  },
}
