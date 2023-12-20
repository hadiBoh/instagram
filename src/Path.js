import React from 'react'
import useAuth from './hooks/useAuth'
import { useParams, Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllUsers } from './features/main/posts/userApiSlice'


const Path = () => {
  const { username } = useParams()
  const auth = useAuth()
  const users = useSelector(selectAllUsers)
  const isUser = users?.some(user => user.username === username)



  if (!auth?.username) {
    return (
        <div>
          <h2>you need to login</h2>
          <Link to="/">login page</Link>
        </div>
    )
  }
  if (auth?.username === username) {
    return <Outlet />
  }
  if (isUser) {
    return (
      <div>
        <h2>{`first logout from ${auth?.username}'s account`}</h2>
      </div>
    )
  }
  return (
    <h2>no such directory</h2>
  )
}

export default Path