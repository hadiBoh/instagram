import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'



const useSocket = () => {
   const socket = useRef()
   useEffect(()=>{
      socket.current = io.connect("ws://localhost:4000")
   },[])
   return socket
}

export default useSocket