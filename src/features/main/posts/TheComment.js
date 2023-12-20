import { memo } from "react"
import CommentMemo from "./Comment"
import AddComment from "./AddComment"


const TheComment = ({userId , postId}) => {

    return (
        <>
            <section className='comments-wrapper'>
                <CommentMemo postId={postId} userId={userId} />
            </section>
            <AddComment postId={postId} userId={userId} />
        </>
    )
}
const TheCommentMemo = memo(TheComment)
export default TheCommentMemo