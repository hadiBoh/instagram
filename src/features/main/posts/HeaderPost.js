import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import useGetURL from '../../../hooks/useGetURL'
import { selectUserById } from './userApiSlice'

const HeaderPost = ({userId}) => {
  const url = useGetURL()
  const params = useParams()
    const user = useSelector(state => selectUserById(state , userId))
  return (
    <header>
    <div>
        <section className='img-cont'>
            <img src={`${url}/${user?.profile}`} alt='profile' />
        </section>
        <Link to={ params?.id ? `../${user?.username}` : `./${user?.username}`} style={{textDecoration:"none" , color:"#222" , fontWeight:"700", fontSize:"1.1rem"}} >{user?.username}</Link>
    </div>
    <button className='btn'>...</button>
</header>
  )
}

export default HeaderPost