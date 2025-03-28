import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

export const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
  },
})

export const { setIsLoading } = appSlice.actions
