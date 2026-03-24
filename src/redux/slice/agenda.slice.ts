import { createSlice } from '@reduxjs/toolkit'

const initialState:{
    openAddModalAgenda: boolean;
} = {
    openAddModalAgenda:false
  }

const agenda = createSlice({
  name: 'agenda',
  initialState,
  reducers: {
    setOpenAddModalAgenda(state, action) {

        state.openAddModalAgenda = action.payload
    },
  },
})

export const { setOpenAddModalAgenda } = agenda.actions
export default agenda.reducer