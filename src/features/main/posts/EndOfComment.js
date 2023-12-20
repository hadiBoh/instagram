import { memo } from "react";
import { useSelector } from "react-redux";
import findTime from "../../../hooks/useFns";
import useGetURL from "../../../hooks/useGetURL";
import { selectCommentById } from "./commentApiSlice";
import { selectUserById } from "./userApiSlice";

const EndOfComment = ({commentId , userId}) => {

    const url = useGetURL()
    const comment = useSelector(state=> selectCommentById(state , commentId))
    const user = useSelector(state=> selectUserById(state , userId))
    let content
    content = <div key={comment?.commentId} className='comment'>
        <div className='img-cont'>
            <img src={`${url}/${user?.profile}`} alt='profile' />
        </div>
        <span>{user?.username}</span>
        <p> {comment?.comment}</p>
        <span>{findTime(comment?.date)}</span>
    </div>
    return content
}

const EndOfCommentMemo = memo(EndOfComment)
export default EndOfCommentMemo