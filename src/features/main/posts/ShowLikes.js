import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAlllikes } from './likeApiSlice'

const ShowLikes = ({postId}) => {
    const likes = useSelector(state => selectAlllikes(state))
    const filterdLikes = useMemo(()=> likes?.filter(like=> like.postId === postId) , [likes , postId])
  return (
    <p className='like'>{filterdLikes?.length} likes</p>
  )
}
const ShowLikesMemo = memo(ShowLikes)
export default ShowLikesMemo