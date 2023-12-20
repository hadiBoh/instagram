import { faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons'
import { faHeart} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectAlllikes, useAddLikeMutation, useDisLikeMutation } from './likeApiSlice'
import { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import useAuth from '../../../hooks/useAuth'

const Like = ({postId }) => {
    const {userId} = useAuth()
    const [addLike] = useAddLikeMutation()
    const [disLike] = useDisLikeMutation()
    
    const likes = useSelector(state => selectAlllikes(state))
    const userHadLike = useMemo(()=> likes?.some(like=> like.postId === postId && like.userId === userId) , [likes , postId , userId])
    let heart
    
    if (userHadLike) {
        heart = <FontAwesomeIcon icon={faHeartSolid} />   
    } else {
        heart = <FontAwesomeIcon icon={faHeart}/>
    }
    
    const handleLike = async(e)=>{
        e.preventDefault()
        const data = {postId , userId}
        if (!userHadLike) {
            try {
                await addLike(data)
                heart = <FontAwesomeIcon icon={faHeartSolid} />    
            } catch (error) {
                console.log(error);
            }
            
        }else{
            try {
                await disLike(data)
                heart = <FontAwesomeIcon icon={faHeart}/>
            } catch (error) {
                console.log(error);
            }
            
        }

    }
    
    
  return <button style={{color:"red"}} className='btn' onClick={handleLike}> {heart}</button>
}

const LikeMemo = memo(Like)
export default LikeMemo