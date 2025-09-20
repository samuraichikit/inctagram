import { baseApi } from '@/services/baseApi'
import {
  DeleteMessageByIdRequest,
  GetMessagesByIdRequest,
  GetMessagesByIdResponse,
  GetMessagesRequest,
  GetMessagesResponse,
  UpdateMessagesStatusResponse,
} from '@/services/messenger/messengerService.types'

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
  useUpdateMessageStatusMutation,
} = messengerService
