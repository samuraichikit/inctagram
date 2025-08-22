import type { Meta, StoryObj } from '@storybook/react'

import { Profile, UserProfileProps } from './Profile'

// const meta = {
//   argTypes: {},
//   component: Profile,
//   tags: ['autodocs'],
//   title: 'Components/Profile',
// } satisfies Meta<typeof Profile>
//
// export default meta
// type Story = StoryObj<typeof meta>

const meta: Meta<UserProfileProps> = {
  component: Profile,
  tags: ['autodocs'],
  title: 'Components/Profile',
}

export default meta
type Story = StoryObj<UserProfileProps>

// Тип для аватаров комментатора
type AvatarType = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

// Тип комментария
export type CommentType = {
  answerCount: number
  content: string
  createdAt: string
  from: {
    avatars: AvatarType[]
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

// Тип картинки поста
type PostImageType = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

// Тип поста
export type PostType = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: PostImageType[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: { firstName: string; lastName: string }
  ownerId: number
  updatedAt: string
  userName: string
}

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
    postId: '1',
    userId: '42',
  },
}
