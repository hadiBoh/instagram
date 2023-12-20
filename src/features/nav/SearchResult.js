import React from 'react'
import { Link, useParams } from 'react-router-dom'

const SearchResult = ({SearchResultFilterd , setSearch , setresClass}) => {

    const params = useParams()
    const clearSetup = ()=>{
        setSearch("")
        setresClass("")
    }

        let content
        if (SearchResultFilterd?.length) {
            content = SearchResultFilterd.map(item=> <Link onClick={clearSetup} className='searchRes' to={`/${params.username}/${item.username}`} key={item.id}>{item.username}</Link>)
        } else {
            content = <p className='searchRes'>no user match</p>
        }

  return content
}

export default SearchResult