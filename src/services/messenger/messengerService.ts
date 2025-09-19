import { WS_EVENT_PATH } from '@/common/constants/wsEventPath'

import { baseApi } from '../baseApi'
import { socketApi } from '../socket/socketApi'
import { Message, SendMessageArgs } from './messengerService.types'

const messengerService = baseApi.injectEndpoints({
  endpoints: builder => ({
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
  }),
})

export const { useSendMessageMutation } = messengerService
