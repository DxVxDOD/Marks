import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {}
})

export type Root_State = ReturnType<typeof store.getState>
export type App_Dispatch = typeof store.dispatch