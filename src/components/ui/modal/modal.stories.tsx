import {Meta, StoryObj} from '@storybook/react'

import {Modal} from './modal'

const meta = {
    component: Modal,
} satisfies Meta<typeof Modal>

type Story = StoryObj<typeof meta>
export default meta


export const Default: Story = {
    args: {
        children: (<div>Transaction failed. Please, write to support</div>),
        title: 'Title',
        open: true
    },
}



