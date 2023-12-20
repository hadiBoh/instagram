import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        auth: {
            accessToken: null,
            userId: null,
            username: null
        }
    },
    reducers: {
        setAuth: (state, action) => {

            const { accessToken, userId, username } = action.payload
            state.auth.accessToken = accessToken
            state.auth.userId = userId
            state.auth.username = username
        },
        clearAuth: (state, action) => {
            state.auth.accessToken = null
            state.auth.userId = null
            state.auth.username = null
        }
    }

})


export const { setAuth, clearAuth  } = authSlice.actions
export const selectAuth = (state) => state.auth.auth
export default authSlice.reducer