import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "../features/auth/authApiSlice"
import { setAuth } from "../features/auth/authSlice"
import "./public.css"
import Register from "./Register"

const Public = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const handleLogin = async (e) => {
    e.preventDefault()
    const data = { username, password }
    const response = await login(data)
    if (response?.error) {
      setErr(response.error.data.message)
      return
    }
    dispatch(setAuth(response.data))
    setUsername('')
    setPassword('')
    navigate(`/${response.data.username}`)
  }



  return (
    <>
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login Form</h1>
        <p className="log-err">{err}</p>
        <div className="input-wrap">
          <label>username</label>
          <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} value={username} />
        </div>
        <div className="input-wrap">
          <label>password</label>
          <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
        </div>
        <button disabled={isLoading} onClick={handleLogin}>{isLoading ? <FontAwesomeIcon icon={faSpinner} /> : 'Login'}</button>
      </form>
      <Register />
    </>
  )

}

export default Public