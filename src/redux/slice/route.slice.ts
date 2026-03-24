import { createSlice } from '@reduxjs/toolkit'

const initialState:{
    path: string;
    history: string[]
} = {
    path: "/",
    history: [],
  }

const route = createSlice({
  name: 'route',
  initialState,
  reducers: {
    navigate(state, action) {

        state.history = [...state.history, state.path]
        state.path = action.payload
    },
  },
})

export const { navigate } = route.actions
export default route.reducer