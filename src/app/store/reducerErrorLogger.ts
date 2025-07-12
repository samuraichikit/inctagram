import type { Middleware } from '@reduxjs/toolkit'

export const reducerErrorLogger: Middleware = storeAPI => next => (action: any) => {
  try {
    return next(action)
  } catch (error) {
    const prevState = storeAPI.getState()

    console.error('Reducer crashed on action:', action.type, {
      action,
      error,
      prevState,
    })

    throw error
  }
}
