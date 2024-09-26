import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'

const meta = {
  argTypes: {
    defaultValue: {
      description:
        'The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs.',
    },
    onValueChange: {
      action: 'value changed',
      description: 'Event handler called when the value changes.',
    },
    value: {
      description:
        'The controlled value of the tab to activate. Should be used in conjunction with onValueChange.',
    },
  },
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const TabsDefault: Story = {
  args: {
    defaultValue: 'tab1',
  },
  render: args => (
    <Tabs {...args}>
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
}

export const DisabledInactiveTab: Story = {
  args: {},
  render: () => (
    <Tabs>
      <TabsList>
        <TabsTrigger disabled value={'tab1'}>
          tab1
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}

export const DisabledActiveTab: Story = {
  args: {
    defaultValue: 'tab1',
  },
  render: args => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger disabled value={'tab1'}>
          tab1
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}
