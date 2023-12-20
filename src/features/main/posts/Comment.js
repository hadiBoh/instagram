import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllComments } from "./commentApiSlice";
import EndOfCommentMemo from "./EndOfComment";

const Comment = ({postId}) => {

    const comments = useSelector(state => selectAllComments(state))
    const filteredComment = useMemo(()=>comments?.filter(comment=> comment.postId === postId),[comments ,postId])
    return (

        filteredComment?.map(comment => {
           return <EndOfCommentMemo key={comment.id} userId={comment.userId} commentId={comment.id} />
        })
    )
}

const CommentMemo = memo(Comment)
export default CommentMemo