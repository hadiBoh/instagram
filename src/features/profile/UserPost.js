import { Link } from "react-router-dom"
import useGetURL from "../../hooks/useGetURL"


const UserPost = ({post}) => {
    const url = useGetURL()
  
  return (
        <Link className='post-img' to={`${post?.id}`}>
             <img src={`${url}/${post?.img}`} alt='post img' style={{display:"block" , maxWidth:"100%"}} />
        </Link>
  )
}

export default UserPost