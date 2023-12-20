import { Navigate, Outlet } from "react-router-dom"
import useAuth from "./hooks/useAuth"

const PreventSigns = () => {
    const auth = useAuth()

        if (!auth?.userId) {
            return <Outlet/>
        }else{
            return <Navigate to={`/${auth?.username}`} replace={true} />
        } 

}

export default PreventSigns