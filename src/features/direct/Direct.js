import {useState } from "react"
import "./direct.css"
import { selectAllUsers } from "../main/posts/userApiSlice"
import { useSelector } from "react-redux"
import useAuth from "../../hooks/useAuth"
import { Link, useLocation } from "react-router-dom"

const Direct = () => {
    
    const auth = useAuth()
    const users = useSelector(selectAllUsers)
    const [searched , setSearched] = useState("")
    const [searchedRes , setSearchedRes] = useState([])
    const location = useLocation()

    const handleSearch = (e)=>{
        e.preventDefault()
        const searchRes = users.filter(user=> user.username.includes(searched) && !user.username.includes(auth.username))
        setSearchedRes(searchRes)
        setSearched("")
    }


  return (
    <div className="message_section">
        <form onSubmit={handleSearch}>
            <input type="text" placeholder="search among users..." onChange={e=> setSearched(e.target.value)} value={searched} />
            <button onClick={handleSearch} >search</button>
        </form>
        {
            searchedRes.map(user=> <p key={user.id} > <Link /* reloadDocument state={{from:location}} replace */ to={`/${auth.username}/message/${user.username}`} >{user.username}</Link></p>)
        }
    </div>
  )
}

export default Direct