
import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";

export const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
    selectId: (post) => post.postId
})
const initialState = postsAdapter.getInitialState({
    post: null
})


export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({


        fetchPosts: builder.query({
            
            query: (page) => {
              return `posts/page?page=${page}`;
            },
            transformResponse: (responseData ,m , arg) => {
                const posts = responseData.filtered.map(post => {
                    post.id = post.postId
                    return post
                })
                return postsAdapter.addMany(initialState, posts)
            },
            async onQueryStarted(page, { queryFulfilled, dispatch }) {
              if (!page) {
                return;
              }
              const { data, error } = await queryFulfilled;
        
              if (data) {
                // Add Posts On Current Request To Page 1
                dispatch(
                  postApiSlice.util.updateQueryData("fetchPosts", 1, (draft) => {
                    postsAdapter.addMany(draft, itemsSelector.selectAll(data));
                  })
                );
        
                if (page > 1) {
                  // Remove Cached Data From State Since We Already Added It To Page 1
                  dispatch(
                    postApiSlice.util.updateQueryData("fetchPosts", page, (draft) => {
                      draft = postsAdapter.getInitialState();
                    })
                  );
                }
              }
            },
          }),
        addPost: builder.mutation({
            query: data => ({
                url: "/posts",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg ,{ dispatch, queryFulfilled }) {
                    try {
                        const {data} = await queryFulfilled
                        dispatch(postApiSlice.util.updateQueryData("fetchPosts", (draft) => {
                            postsAdapter.updateOne(draft, data.insertId)
                        }))
                    } catch (error) {
                        console.log("file format is not supported");
                    }
            }
        }),
    })
})


export const { useAddPostMutation, useFetchPostsQuery } = postApiSlice

export const itemsSelector = postsAdapter.getSelectors(stste => stste)
/* export const selectPostResult = postApiSlice.endpoints.getPostsByPage.select()

const selectPostData = createSelector(
    selectPostResult,
    postResult => postResult.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostData(state) ?? initialState) */

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = itemsSelector
























