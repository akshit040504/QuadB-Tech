import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./features/tasks/tasksSlice"
import authReducer from "./features/auth/authSlice"
import weatherReducer from "./features/weather/weatherSlice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    weather: weatherReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

