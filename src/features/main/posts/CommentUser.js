import { memo } from "react"
import { useSelector } from "react-redux"
import useGetURL from "../../../hooks/useGetURL"
import { selectUserById } from "./userApiSlice"


const CommentUser = ({userId}) => {
    const url = useGetURL()
    const user = useSelector(state => selectUserById(state , userId))
    
    return (
        <>
            <div className='img-cont'>
                <img src={`${url}/${user?.profile}`} alt='profile' />
            </div>
            <span>{user.username}</span>
        </>
    )
}

const CommentUserMeno = memo(CommentUser)
export default CommentUserMeno