import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import { setAuth } from "./authSlice";


const PersistLogin = () => {

    const [refresh] = useRefreshMutation()
    
    const [refreshTrue , setRefreshTrue] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const doRefresh = async()=>{
            const response = await refresh()
            dispatch(setAuth({...response.data}))
            setRefreshTrue(true) // this helps protecting route with delay route does not go further 
          }
      
            doRefresh()
    },[refresh , dispatch])

    let content
    
    if (refreshTrue) {
        content = <Outlet/>
    }

  return content
}

export default PersistLogin