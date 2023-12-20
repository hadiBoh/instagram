import axios from 'axios'




export const api = axios.create({
    baseURL: 'http://localhost:3500',
}) 

export const getPostsPage = async(page = 1)=>{
    const response = await api.get(`/posts/page?page=${page}`)
    return response.data.filtered
}
export const getAllPages = async()=>{
    const response = await api.get(`/posts`)
    return response.data.filtered
}
export const addPost = async(data)=>{
    const response = await api.post(`/posts` , data)
    return response.data
}