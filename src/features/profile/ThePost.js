import { faBookmark, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import useGetURL from '../../hooks/useGetURL'
import Caption from '../main/posts/Caption'
import HeaderPost from '../main/posts/HeaderPost'
import LikeMemo from '../main/posts/Like'
import ShowLikesMemo from '../main/posts/ShowLikes'
import TheCommentMemo from '../main/posts/TheComment'

const ThePost = ({post}) => {
    const url = useGetURL()
    const postId = post?._id
    const userId = post?.user
  return (
    <article className='post' style={{maxWidth:"600px" , margin:"0 auto" , marginTop:"7rem" , marginBottom:"7rem"}} >
    <HeaderPost userId={userId}/>
    <section className='post-img'>
            <img src={`${url}/${post?.img}`} alt='post img' />
        </section>
    <footer>
        <div className='left-foot-icon'>
            
            <LikeMemo postId={postId}/>
            <FontAwesomeIcon icon={faComment} />
            <FontAwesomeIcon icon={faPaperPlane} />
        </div>
        <div className='right-foot-icon'>
            <FontAwesomeIcon icon={faBookmark} />
        </div>
    </footer>
    <ShowLikesMemo postId={postId} />
    <Caption userId={userId} postId={postId}/>
    <TheCommentMemo userId={userId} postId={postId} />
</article>
  )
}

export default ThePost