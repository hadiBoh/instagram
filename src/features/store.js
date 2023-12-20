import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authSlice from "./auth/authSlice";
import pageSlice from "./main/posts/pageSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
        reducer:{
            auth:authSlice,
            page:pageSlice,
            [apiSlice.reducerPath]:apiSlice.reducer,
        },
        middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware)
        ,
        devTools:false
})

setupListeners(store.dispatch)