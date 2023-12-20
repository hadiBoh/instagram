import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useLogoutMutation } from "../auth/authApiSlice"
import { selectUserById } from "./posts/userApiSlice"
import useGetURL from "../../hooks/useGetURL"

const SideBar = () => {

    const url = useGetURL()
    const {userId} = useAuth()
    const user =  useSelector(state => selectUserById(state , userId))
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

    const handleLogout = async(e)=>{
        e.preventDefault()

        try {
            await logout()
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='side-wrapper'>
            <header>
                <div><img src={`${url}/${user?.profile}`} alt='profile' /></div>
                <div>
                    <h3>{user?.username}</h3>
                    <p>welcome to instagram</p>
                </div>
                <button className='btn' onClick={handleLogout}>Sign Out</button>
            </header>
            <div className='suggests'>
                <h3>suggestions</h3>
                <button className='btn'>See All</button>
            </div>
            <ul>
                <li>
                    <div><img src='36772.jpg' alt='profile' /></div>
                    <div>
                        <h4>cow_girl</h4>
                        <p>poony</p>
                    </div>
                    <button className='btn'>follow</button>
                </li>
            </ul>
        </div>
    )
}

export default SideBar
