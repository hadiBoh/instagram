import { createEntityAdapter , createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";

const commentAdapter = createEntityAdapter({})
const initialState = commentAdapter.getInitialState()

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
        getComments : builder.query({
            query:()=> `/comments`,
            validateStatus:(response , result)=>{
                return response.status === 200 && !result.isError
            },
            transformResponse:responseData =>{
                const loadedComments = responseData.comments.map(comment=> {
                    comment.id = comment._id
                    comment.userId = comment.user
                    comment.postId = comment.post
                    return comment
                })

                return commentAdapter.setAll(initialState,loadedComments)
            },
            providesTags:(result , error , arg)=>{
                if (result?.ids) {
                    return[
                        {type:'Comment' , id:'List'},
                        ...result.ids.map(id=>({type:'Comment' , id}))
                    ]
                }else{
                    return[{type:'Comment' , id:'List'}]                
                }
            }
        }),
        addComment: builder.mutation({
            query: data =>({
                url:"comments/userComments",
                method:"POST",
                body: {...data}
            }),
            invalidatesTags:[{type:"Comment" , id:"List"}]
        })
    })
})


export const {useGetCommentsQuery , useAddCommentMutation} = commentApiSlice

export const selectCommentResult = commentApiSlice.endpoints.getComments.select()

const selectCommentData = createSelector(
    selectCommentResult,
    commentResult => commentResult.data
)


export const {
    selectAll:selectAllComments,
    selectById:selectCommentById,
    selectIds:selectCommentIds
} = commentAdapter.getSelectors(state=> selectCommentData(state) ?? initialState)


export const selectCommentsForPost = createSelector(
    [selectAllComments , (state , postId)=> postId],
    (comments , postId) => comments.filter(comment => comment.postId === postId) 
)