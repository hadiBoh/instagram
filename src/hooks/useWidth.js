import { useEffect, useState } from "react"


const useWidth = () => {

    const [width , setWidth] = useState(window.innerWidth)

    useEffect(()=>{
        function setWidthFunc(){
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize" , setWidthFunc)

        return ()=>{
            window.removeEventListener("resize" , setWidthFunc)
        }
    },[width])

  return [width]
}

export default useWidth