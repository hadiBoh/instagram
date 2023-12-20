import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../features/auth/authApiSlice"

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [register, { isLoading }] = useRegisterMutation()
    const [err , setErr] = useState("")
  
    const handleRegister = async (e) => {
      e.preventDefault()
      const data = { username, password }
      const response = await register(data)
      if (response?.error) {
        setErr(response.error.data.message)
        setUsername('')
        setPassword('')
        return
      }
      setErr(response.data.message)
      setUsername('')
      setPassword('')
      navigate(`/`)
    }
  
  
  
    return (
      <form className="login-form" onSubmit={handleRegister}>
        <h1>Registeration Form</h1>
        <p className="log-err">{err}</p>
        <div className="input-wrap">
          <label>username</label>
          <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} value={username} />
        </div>
        <div className="input-wrap">
          <label>password</label>
          <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
        </div>
        <button disabled={isLoading} onClick={handleRegister}>{isLoading ? <FontAwesomeIcon icon={faSpinner} /> : 'Register'}</button>
      </form>
  
    )
}

export default Register