import type { Meta, StoryObj } from '@storybook/react'

import { ScrollArea } from './ScrollArea'

const meta = {
  argTypes: {},
  component: ScrollArea,
  tags: ['autodocs'],
  title: 'Components/ui/ScrollArea',
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const VerticalScrollArea: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ height: '200px', width: '200px' }}>
        <ScrollArea>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi provident sint porro ipsa
          iste. Labore rerum assumenda dicta officia voluptatem enim quibusdam quaerat. Iure,
          voluptate magnam? Dolorum ad ea non. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Iusto doloribus ipsa a sequi quia quam. Quia minima itaque qui possimus recusandae.
          Velit, eum error obcaecati rerum accusantium aspernatur veritatis vel! Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Pariatur quibusdam natus iure ullam nobis earum
          aspernatur fugit, consequuntur explicabo commodi recusandae vel corrupti impedit alias rem
          asperiores tempora ad voluptatum.
        </ScrollArea>
      </div>
    )
  },
}
