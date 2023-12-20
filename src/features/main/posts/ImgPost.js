import React from 'react'
import useGetURL from '../../../hooks/useGetURL'
import {useGetPostsByPageQuery } from './postApiSlice'


const ImgPost = ({postId}) => {
    
    const url = useGetURL()
    const { post } = useGetPostsByPageQuery('getPostsByPage', {
        selectFromResult: ({ data, isLoading }) => ({
            post: data?.entities[postId],
            isLoading
        }),
    })
    /* const post = useSelector(state => selectUserPostById(state , postId)) */
    return (
        <section className='post-img'>
            <img src={`${url}//${post?.img}`} alt='post img' />
        </section>
    )
}

export default ImgPost
