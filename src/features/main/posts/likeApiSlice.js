import {createEntityAdapter,createSelector} from "@reduxjs/toolkit"
import { apiSlice } from "../../../api/apiSlice"


const likesAdapter = createEntityAdapter({})

const initialState = likesAdapter.getInitialState()

export const likeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLikes: builder.query({
            query:()=> `/likes`,
            validateStatus:(response , result)=>{
                return response.status === 200 && !result.isError
            },
            transformResponse:responseData =>{
                const loadedLikes = responseData.likes.map(like=> {
                    like.id= like._id
                    like.postId = like.post
                    like.userId = like.user
                    return like
                })

                return likesAdapter.setAll(initialState,loadedLikes)
            },
            providesTags:(result , error , arg)=>{
                if (result?.ids) {
                    return[
                        {type:'Like' , id:'List'},
                        ...result.ids.map(id=>({type:'Like' , id}))
                    ]
                }else{
                    return[{type:'Like' , id:'List'}]                
                }
            }
        }),
        addLike: builder.mutation({
            query: data =>({
                url:"/likes",
                method:"POST",
                body: {...data}
            }),
            invalidatesTags:[{type:"Like" , id:"List"}]
        }),
        disLike: builder.mutation({
            query: data =>({
                url:"/likes",
                method:"DELETE",
                body: {...data}
            }),
            invalidatesTags:[{type:"Like" , id:"List"}]
        })
    })
})


export const {useGetLikesQuery , useAddLikeMutation , useDisLikeMutation} = likeApiSlice

export const selectedLikesResult = likeApiSlice.endpoints.getLikes.select() 

const selecteLikesData = createSelector(
    selectedLikesResult,
    likesResult=> likesResult.data 
)

export const {
    selectAll:selectAlllikes,
    selectById:selectlikeById,
    selectIds:selectlikeIds
} = likesAdapter.getSelectors(state=> selecteLikesData(state) ?? initialState)





