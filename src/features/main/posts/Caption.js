import React from 'react'
import { useSelector } from 'react-redux'
import { useGetPostsByPageQuery } from './postApiSlice'
import { selectUserById } from './userApiSlice'

const Caption = ({postId , userId}) => {

    const { post } = useGetPostsByPageQuery('getPostsByPage', {
        selectFromResult: ({ data, isLoading }) => ({
            post: data?.entities[postId],
            isLoading
        }),
    })
    const user = useSelector(state => selectUserById(state , post?.user))


    return (
        <div className='caption'>
            <span>{user?.username}</span>
            <p>{post?.caption}</p>
        </div>
    )
}

export default Caption