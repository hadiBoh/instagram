import { useSelector } from "react-redux"
import { selectAuth } from "../features/auth/authSlice"

const useAuth = () => {

    const auth = useSelector(selectAuth)

  return auth
}

export default useAuth