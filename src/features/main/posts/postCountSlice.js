
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";

export const postCountAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postCountAdapter.getInitialState({})

export const postCountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCount: builder.query({
            query :()=> "/posts",
/*             transformResponse:(responseData)=>{
                return postCountAdapter.setAll(initialState , responseData)
            },
            */
        }),
        getAllUserPosts: builder.query({
            query :(id)=> `/posts/userPosts?userId=${id}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            transformResponse:(responseData)=>{
                const posts = responseData.map(post=>{
                    post.id = post._id

                    return post
                })
                
                return postCountAdapter.setAll(initialState , posts)
            },
            forceRefetch:({currentArg , previousArg , endpointState})=>{
                if (currentArg === previousArg) {
                    return true
                }              
                return currentArg !== previousArg
            },
           providesTags: (result)=>{
            if (result?.ids) {
                return [{type:"UPost" , id:"List"} , ...result.ids.map(id=> { return {type:"UPost" , id}})]
            }
            return [{type:"UPost" , id:"List"}]
           } 
        }),
        getUserPostById: builder.query({
            query :(id)=> `/posts/singlePost?postId=${id}`,
            transformResponse:(responseData)=>{
                responseData.id = responseData.postId
                return responseData
            },
            providesTags: ()=>{
                return [{type:"UPost" , id:"List"}]
            }
        }),
    })
})


export const {  useGetAllCountQuery , useGetAllUserPostsQuery , useGetUserPostByIdQuery} = postCountApiSlice

export const selectPostResult = postCountApiSlice.endpoints.getAllUserPosts.select()

const selectPostData = createSelector(
    selectPostResult,
    postResult => postResult.data
)


const selector = postCountAdapter.getSelectors(state => selectPostData(state) ?? initialState)

export const {
    selectAll: selectAllUserPosts,
    selectById: selectUserPostById,
    selectIds: selectUserPostIds
} = selector
