import { useCallback, useEffect, useRef, useState } from "react"
import useUseGetPostsByPageQuery from "../../../hooks/useUseGetPostsByPageQuery"
import {MemoizedPost} from "./Post"



const Posts = () => {

/*     const interval = {
        pollingInterval:15000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true} */
        const [page , setPage] = useState(JSON.parse(localStorage.getItem("pageParam")) || 1)

        useEffect(()=>{
            const data = localStorage.getItem("pageParam")
            if (data !== "undefined") {
                setPage(JSON.parse(data))
            }
        },[])


    useEffect(()=>{
        localStorage.setItem("pageParam" , JSON.stringify(page))
    },[page])

    const {data :posts , isLoading , hasNext , isFetching } = useUseGetPostsByPageQuery(page)



    let content


        const iniObserver = useRef()
        const lastPostRef = useCallback(post=>{
            if (isLoading) return
            if (isFetching) return
            if (iniObserver.current) iniObserver.current.disconnect()

            iniObserver.current = new IntersectionObserver(posts=>{
                if (posts[0].isIntersecting&& hasNext ) {
                    console.log("near Last");
                    setPage(prev=> prev+1)
                }
            })
            
            if(post) iniObserver.current.observe(post)
            
        },[isLoading , hasNext , isFetching])

        content = (
            <div className='posts-container'>
                {posts?.ids?.map((postId , i)=> {
                    if (posts.ids.length === i+1) {
                        return <MemoizedPost ref={lastPostRef} key={postId} postId={postId} isFetching={isFetching} />
                    }
                    return <MemoizedPost key={postId} postId={postId} />
                })}
                
            </div>
        )
    



    return content
}

export default Posts