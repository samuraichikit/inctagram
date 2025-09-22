import { WS_EVENT_PATH } from '@/common/constants/wsEventPath'
import { baseApi } from '@/services/baseApi'

import { socketApi } from '../socket/socketApi'
import {
  DeleteMessageByIdRequest,
  GetMessagesByIdRequest,
  GetMessagesByIdResponse,
  GetMessagesRequest,
  GetMessagesResponse,
  Message,
  SendMessageArgs,
  UpdateMessagesStatusResponse,
} from './messengerService.types'

const messengerService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteMessageById: builder.mutation<void, DeleteMessageByIdRequest>({
        query: ({ id }) => {
          return {
            method: 'DELETE',
            params: { id },
            url: `/v1/messenger/${id}`,
          }
        },
      }),
      getMessages: builder.query<GetMessagesResponse, GetMessagesRequest>({
        query: args => {
          return {
            method: 'GET',
            params: args,
            url: `/v1/messenger`,
          }
        },
      }),
      getMessagesById: builder.query<GetMessagesByIdResponse, GetMessagesByIdRequest>({
        query: ({ dialoguePartnerId, ...args }) => {
          return {
            method: 'GET',
            params: args,
            url: `/v1/messenger/${dialoguePartnerId}`,
          }
        },
      }),
      sendMessage: builder.mutation<Message, SendMessageArgs>({
        queryFn: async ({ message, receiverId }) => {
          return await new Promise(resolve => {
            socketApi.emit(
              WS_EVENT_PATH.RECEIVE_MESSAGE,
              { message, receiverId },
              (savedMessage: Message) => {
                resolve({ data: savedMessage })
              }
            )
          })
        },
      }),
      updateMessageStatus: builder.mutation<UpdateMessagesStatusResponse, void>({
        query: () => {
          return {
            method: 'PUT',
            url: `/v1/messenger`,
          }
        },
      }),
    }
  },
})

export const {
  useDeleteMessageByIdMutation,
  useGetMessagesByIdQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useUpdateMessageStatusMutation,
} = messengerService
