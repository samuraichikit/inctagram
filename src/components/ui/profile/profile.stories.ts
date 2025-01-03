import type { Meta, StoryObj } from '@storybook/react'

import { Profile } from './Profile'

const meta = {
  argTypes: {},
  component: Profile,
  tags: ['autodocs'],
  title: 'Components/Profile',
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileStory: Story = {
  args: {
    comments: [
      {
        answerCount: 0,
        content: 'string',
        createdAt: '2024-11-23T03:47:32.890Z',
        from: {
          avatars: [
            {
              createdAt: '',
              fileSize: 1,
              height: 1,
              url: '',
              width: 1,
            },
          ],
          id: 0,
          username: 'string',
        },
        id: 0,
        isLiked: true,
        likeCount: 0,
        postId: 0,
      },
    ],
    post: {
      avatarOwner:
        'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
      avatarWhoLikes: [''],
      createdAt: '2024-11-14T15:42:20.142Z',
      description: 'description',
      id: 1,
      images: [
        {
          createdAt: '2024-11-14T15:42:19.839Z',
          fileSize: 300,
          height: 300,
          uploadId: 'string',
          url: 'https://example.com/image.jpg',
          width: 300,
        },
      ],
      isLiked: true,
      likesCount: 1,
      location: 'location',
      owner: {
        firstName: 'firstName',
        lastName: 'lastName',
      },
      ownerId: 1,
      updatedAt: '2024-11-14T15:42:20.142Z',
      userName: 'Alex',
    },
  },
}
