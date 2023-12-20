import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSmile } from "@fortawesome/free-regular-svg-icons"
import { useAddCommentMutation } from "./commentApiSlice"
import { useState } from "react"
import useAuth from "../../../hooks/useAuth"

const AddComment = ({postId }) => {

    const {userId} = useAuth()

    const [addComment ] = useAddCommentMutation()
    const [commentText , addCommentText] = useState("")

    const handleAddComment = async (e)=>{

        if (commentText === "") {
            return
        }
        e.preventDefault()
        const data = {postId , userId , comment:commentText}

        try {
            await addComment(data)
            addCommentText("")
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <section className='add-comment'>
            <button className='btn'><FontAwesomeIcon icon={faSmile} /></button>
            <input type='text' onChange={e => addCommentText(e.target.value)} value={commentText} placeholder='Add a comment...' />
            <button className='btn' onClick={handleAddComment}>Post</button>
        </section>
    )
}

export default AddComment