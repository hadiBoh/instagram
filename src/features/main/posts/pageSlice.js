import { createSlice } from "@reduxjs/toolkit";


const pageSlice = createSlice({
    name: "page",
    initialState: {
        loading: false
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        }
    }
})


export const { setPage } = pageSlice.actions
export const selectPage = (state) => state.page.page
export default pageSlice.reducer