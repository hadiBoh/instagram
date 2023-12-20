import { useGetAllUserPostsQuery } from "../main/posts/postCountSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner } from '@fortawesome/free-solid-svg-icons'
import UserPost from "./UserPost";
import './profile.css'



const UserPosts = ({userId}) => {

    let content

    const {data:posts , isLoading , isSuccess , isFetching} = useGetAllUserPostsQuery(userId)


    if (isFetching || isLoading ) {
        content = <div className="load"><FontAwesomeIcon icon={faSpinner} /></div>
    }
    if (isSuccess) {
        const {ids , entities} = posts
        content = <div className="user-posts-wrapper" >
            {ids.map(id=> {
                return <UserPost  key={id} post={entities[id]} />
            })}
        </div>
    }

  return content
}

export default UserPosts