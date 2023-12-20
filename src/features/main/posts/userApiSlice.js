import { createEntityAdapter , createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";

const userAdapter = createEntityAdapter({})
const initialState = userAdapter.getInitialState()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
        getUsers : builder.query({
            query:()=> `/users`,
            validateStatus:(response , result)=>{
                return response.status === 200 && !result.isError
            },
            transformResponse:responseData =>{
                const loadedUsers = responseData.users.map(user=> {
                    user.id = user._id
                    return user
                })
                
                return userAdapter.setAll(initialState,loadedUsers)
            },
            providesTags:(result , error , arg)=>{
                if (result?.ids) {
                    return[
                        {type:'User' , id:'List'},
                        ...result.ids.map(id=>({type:'User' , id}))
                    ]
                }else{
                    return[{type:'User' , id:'List'}]                
                }
            }
        }),
        updateUser: builder.mutation({
            query: data =>({
                url:"users",
                method:"PUT",
                body:data
            }),
            invalidatesTags: (result , error , args)=> [{type:"User" , id:args.id}]

        }),
        updateUserBio: builder.mutation({
            query: data =>({
                url:"users/single",
                method:"PUT",
                body:{...data}
            }),
            invalidatesTags: (result , error , args)=> [{type:"User" , id:args.id}]

        }),

    })
})


export const {useGetUsersQuery , useUpdateUserMutation , useUpdateUserBioMutation} = userApiSlice

export const selectUserResult = userApiSlice.endpoints.getUsers.select()

const selectUserData = createSelector(
    selectUserResult,
    userResult => userResult.data
)

export const {
    selectAll:selectAllUsers,
    selectById:selectUserById,
    selectIds:selectUserIds
} = userAdapter.getSelectors(state=> selectUserData(state) ?? initialState)