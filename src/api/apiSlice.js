import { createApi  , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuth } from "../features/auth/authSlice";


const baseQuery =  fetchBaseQuery({
    baseUrl:'https://instagram-api-fc0p.onrender.com/',
    credentials:"include",
    prepareHeaders:(headers , {getState})=>{
        const token = getState().auth.auth.accessToken
        if (token) headers.set('authorization',`Bearer ${token}`)
        return headers
    }
})

const baseQueryWithReAuth = async (args , api , extraOptions)=>{
    /* console.log(args); console.log(api); console.log(extraOptions); */

    let result = await baseQuery(args , api , extraOptions) 
    /* console.log(result); */
    if(result?.error?.status === 403){
        console.log("sending refresh token...");


    const refreshResult = await baseQuery("/refresh" , api , extraOptions)

    if(refreshResult?.data){
        api.dispatch(setAuth({...refreshResult.data}))
        result = await baseQuery(args , api , extraOptions)
    }else{
        if(refreshResult?.error?.status === 403){
            refreshResult.error.data.message = "your login has expired! "
        }
        return refreshResult
    }

    }
    return result
}

/* export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes:["User" , "Post" , "Comment" , "Like" , "Count"],
    endpoints:builder => ({})
}) */
export const apiSlice = createApi({
    baseQuery:baseQueryWithReAuth,
    tagTypes:["User" , "Post" , "Comment" , "Like" , "Count" , "UPost" , "Message"],
    endpoints:builder => ({})
})
