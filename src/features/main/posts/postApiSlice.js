import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";

export const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
    
})
const initialState = postAdapter.getInitialState({
    posts: {ids:[] , entities:{}},
    currentArg:0
})


export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPostsByPage: builder.query({
            query: (pageNumber) => `posts/page?page=${pageNumber}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            transformResponse: (responseData ,m , arg) => {
                const posts = responseData.filtered.map(post => {
                    post.id = post._id
                    return post
                })

                const allIds = posts.map(post=> post.id)
                const allData = posts.map(post=> [post.id , post])
                //how to make object members with object id number inside itself
                const obj = Object.fromEntries(allData)
                const combineData = [...initialState.posts.ids , ...allIds]
                const unique = [...new Set(combineData)]
                initialState.posts = {ids:[...unique] , entities:{...initialState.posts.entities , ...obj}}

                initialState.currentArg = initialState.currentArg +1
                return postAdapter.setMany(initialState, posts)
            },
            merge: (current, newPosts , k) => {
                const combineData = [...initialState.posts.ids , ...newPosts.ids]
                const unique = [...new Set(combineData)]
                initialState.posts = {ids:[...unique] , entities:{...initialState.posts.entities , ...newPosts.entities}}
                postAdapter.upsertMany(current, itemsSelector.selectAll(initialState.posts))
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg , endpointState }) {
                
                if (currentArg === 1 && previousArg === "getPostsByPage"  ) {
                     previousArg = 1
                     return currentArg === previousArg 
                     
                }
                if (currentArg === "getPostsByPage" && previousArg === undefined  ) {
                    endpointState.originalArgs = 1
                    console.log("here");
                     return currentArg === previousArg 
                     
                }
                if (currentArg === "getPostsByPage"  ) {
                     return currentArg === previousArg 
                     
                }
                return currentArg !== previousArg
            },
            providesTags: (result , error , arg )=>{
                    return [{ type: 'Post', id: 'List' }]
                
            }
        }),
        addPost: builder.mutation({
            query: data => ({
                url: "/posts",
                method: "POST",
                body: data
            }),
            transformResponse: (responseData ,m , arg) => {

                responseData.id = responseData._id

                const id = Number(responseData.id)
                const data = [[id , responseData]]
                //how to make object members with object id number inside itself
                const obj = Object.fromEntries(data)
                const combineData = [...initialState.posts.ids , id]
                const unique = [...new Set(combineData)]
                initialState.posts = {ids:[...unique] , entities:{...initialState.posts.entities , ...obj}}
                return postAdapter.setOne(initialState, responseData)
            },
            invalidatesTags: [{ type: 'Post', id: 'List' }]
        }),
    })
})


export const { useAddPostMutation, useGetPostsByPageQuery } = postApiSlice

export const itemsSelector = postAdapter.getSelectors(stste => stste)
/* export const selectPostResult = postApiSlice.endpoints.getPostsByPage.select()

const selectPostData = createSelector(
    selectPostResult,
    postResult => postResult.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors(state => selectPostData(state) ?? initialState) */

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = itemsSelector