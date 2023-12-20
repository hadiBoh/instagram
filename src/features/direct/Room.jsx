import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState , memo  } from 'react'
import { useDispatch } from 'react-redux'
import {useLocation, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { messageApiSlice, useGetMessageQuery } from './messageApiSlice'

const Room = ({ firstScroll,comings}) => {
    const auth = useAuth()
    const params = useParams()
    const [allMsgs , setAllMsgs] = useState([])
    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const {data: messages ,isLoading} = useGetMessageQuery(auth?.username)

    useEffect(()=>{
        dispatch(messageApiSlice.endpoints['getMessage'].initiate(auth?.username, { forceRefetch: true }))
    },[pathname , auth?.username , dispatch])
    
    useEffect(()=>{
        firstScroll?.current?.scrollIntoView({behavior:"smooth" ,block: "end", inline: "nearest" })
    },[messages , comings,firstScroll ])
    

    useEffect(()=>{
        const timer = setTimeout(() => {
            firstScroll?.current?.scrollIntoView({behavior:"smooth"})
        },500)
    
        return () => clearTimeout(timer);
    },[isLoading , firstScroll])

    useEffect(()=>{
        if (messages && !comings) {
            setAllMsgs([...messages])
        }else if (messages && comings){
            setAllMsgs(prev=> [...prev , comings])
        }
    },[messages , comings])


    if (isLoading) {
        return(
            <div className='load' style={{margin:"0 auto" , marginTop:"20%"}}><FontAwesomeIcon icon={faSpinner}/></div>
        )
    }else{
        return (

            allMsgs?.map((message , i)=> message.sender === params.user ?
                 <div key={message._id} className="guest" >{message.msg}</div> :
             <div key={message._id} className="owner">{message.msg}</div> )
            
          )
    }

}

const MemoizedRoom = memo(Room)
export default MemoizedRoom