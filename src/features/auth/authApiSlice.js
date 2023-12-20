import { apiSlice } from "../../api/apiSlice";
import { clearAuth, setAuth } from "./authSlice";



export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login:builder.mutation({
            query: data=>({
                url:"/login",
                method:"POST",
                body:{...data}
            })
        }),
        refresh:builder.mutation({
            query: ()=>({
                url:"/refresh",
                method:"GET"
            }),
            async onQueryStarted(arg , {dispatch , queryFulfilled}){
                console.log('refresh');
                try {
                    const {data} = await queryFulfilled
                    dispatch(setAuth({...data}))
                } catch (error) {
                    console.error("first login to be able to refresh!");
                }
            }
        }),
        register: builder.mutation({
            query:(data)=>({
                url:"/register",
                method:"POST",
                body:{...data}
            }),
        }),
        logout:builder.mutation({
            query: ()=>({
                url:"/logout",
                method:"POST"
            }),
            async onQueryStarted(arg , {dispatch , queryFulfilled}){
                console.log('logout');
                try {
                    await queryFulfilled
                    dispatch(clearAuth())
                    /* dispatch(apiSlice.util.resetApiState())   */
                } catch (error) {
                    console.log(error);
                }
            }
        }),
    })
}) 


export const {useLoginMutation , useRefreshMutation , useLogoutMutation , useRegisterMutation} = authApiSlice 