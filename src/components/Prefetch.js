import { Outlet } from "react-router-dom"
import { store } from "../features/store"
import { userApiSlice } from "../features/main/posts/userApiSlice"
import { likeApiSlice } from "../features/main/posts/likeApiSlice"
import { commentApiSlice } from "../features/main/posts/commentApiSlice"
import { useEffect } from "react"
import useAuth from "../hooks/useAuth"

const Prefetch = () => {

    const {userId} = useAuth()
    useEffect(() => {
        console.log("subscribing...");
        const users = store.dispatch(userApiSlice.endpoints.getUsers.initiate())
        /* const userPosts = store.dispatch(postCountApiSlice.endpoints.getAllUserPosts.initiate(userId)) */
        const likes = store.dispatch(likeApiSlice.endpoints.getLikes.initiate())
        const comments = store.dispatch(commentApiSlice.endpoints.getComments.initiate())


        return () => {
            console.log("unSubscribing...");
            users.unsubscribe()
            /* userPosts.unsubscribe() */
            likes.unsubscribe()
            comments.unsubscribe()
        }
    }, [userId])
    return <Outlet />
}

export default Prefetch