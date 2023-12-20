import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'



const useSocket = () => {
   const socket = useRef()
   useEffect(()=>{
      socket.current = io.connect("https://instagram-direct.onrender.com")
   },[])
   return socket
}

export default useSocket
