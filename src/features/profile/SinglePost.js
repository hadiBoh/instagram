import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom"
import { useGetUserPostByIdQuery } from "../main/posts/postCountSlice";
import Nav from "../nav/Nav";
import ThePost from "./ThePost";


const SinglePost = () => {
    const params = useParams()
    const postId = params?.id
    /* const post = useSelector(state => selectUserPostById(state , postId)) */

    const {data , isLoading} = useGetUserPostByIdQuery(postId)
    let content 
    if (isLoading) {
        content = <div className="load" style={{marginTop:"10rem"}}><FontAwesomeIcon icon={faSpinner} /></div>
    }else{
        content = <ThePost post={data} />
    }
    return (
        <>
            <Nav />
            
            {content}
        </>

    )
}

export default SinglePost