import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { appSlice } from '@/components/pagesComponents/app/service/app.slice'
import { createPostSlice } from '@/components/pagesComponents/createPost/service/createPost.slice'
import { baseApi } from '@/services/baseApi'
import { countryAndCity } from '@/services/countryAndCity/countryAndCityService'
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { reducerErrorLogger } from './reducerErrorLogger'

const makeStore = () =>
  configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(reducerErrorLogger)
        .concat(baseApi.middleware)
        .prepend(countryAndCity.middleware),
    reducer: {
      [appSlice.name]: appSlice.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
      [countryAndCity.reducerPath]: countryAndCity.reducer,
      [createPostSlice.name]: createPostSlice.reducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
