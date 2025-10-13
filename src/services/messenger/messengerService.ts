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
  UpdateMessagesStatusRequest,
} from './messengerService.types'

export const messengerService = baseApi.injectEndpoints({
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
        forceRefetch({ currentArg, previousArg }) {
          return (
            currentArg?.dialoguePartnerId !== previousArg?.dialoguePartnerId ||
            currentArg?.cursor !== previousArg?.cursor
          )
        },

        merge: (currentCache, newCache) => {
          currentCache.items.push(...newCache.items)
          currentCache.totalCount = newCache.totalCount ?? currentCache.totalCount
        },

        query: ({ cursor, dialoguePartnerId }) => ({
          method: 'GET',
          params: cursor ? { cursor } : undefined,
          url: `/v1/messenger/${dialoguePartnerId}`,
        }),

        serializeQueryArgs: ({ endpointName, queryArgs }) =>
          `${endpointName}-${queryArgs.dialoguePartnerId}`, // один кэш на диалог
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
      updateMessageStatus: builder.mutation<void, UpdateMessagesStatusRequest>({
        queryFn: async ({ dialoguePartnerId, ids }, _api, _extraOptions, baseQuery) => {
          await new Promise(resolve => {
            socketApi.emit(WS_EVENT_PATH.MESSAGE_READ, { dialoguePartnerId, ids })
          })

          await baseQuery({
            body: { ids },
            method: 'PUT',
            url: `/v1/messenger`,
          })

          return { data: undefined }
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
