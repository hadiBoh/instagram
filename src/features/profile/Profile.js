import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectAllUsers, useUpdateUserBioMutation, useUpdateUserMutation } from "../main/posts/userApiSlice"
import Nav from "../nav/Nav"
import UserPosts from "./UserPosts"
import useGetURL from '../../hooks/useGetURL'

const Profile = () => {
  const url = useGetURL()
    const users = useSelector(selectAllUsers)
    const [updateUser , {isLoading}] = useUpdateUserMutation()
    const [updateUserBio , {isLoading:isBioLoading}] = useUpdateUserBioMutation()
    const profPhotoRef = useRef()
    const param = useParams()

    let user
    if (param?.username === param?.person) {
      console.log('fix it later ');
    }
    if (param?.person !== "profile") {
       user = users?.filter(user=> user.username === param?.person)[0]
    }else{
       user = users?.filter(user=> user.username === param?.username)[0]
    }
  
    const [img , setImg] = useState('')
    const [bio , setBio] = useState('')

  let edit
    function handleImg(e){
        setImg(e.target.files[0]) 
    }
    const setImgFunc = async(e)=>{
      e.preventDefault()
      const formData = new FormData()

      if (!img) {
        return
      }

      formData.append('profile' , img)
      formData.append('userId' , user?.id)


      try {
        await updateUser(formData)
      } catch (error) {
        console.log(error);
      }
    }
    
    const setBioFunc = async(e)=>{
      e.preventDefault()
      if (!bio) {
        return
      }
      const data = {
        userId: user?.id,
        bio
      }
      try {
        await updateUserBio(data)
        setBio("")
      } catch (error) {
        console.log(error);
      }

    }

    const sectionStyle = {display:"flex" , height:"50px" , justifyContent:"center" , alignItems:"center" , marginTop:"2rem" , gap:"1rem"}
    const btnStyle = {cursor:"pointer" , border:"none" , outline:"none" , padding:"1rem" , background:"#47afff" , color:"#fff" , borderRadius:"5px"}
    if (param?.person === "profile") {
      edit =
       <>
        <section style={sectionStyle}>
        <button className="btn" style={{ fontSize:"2rem" , color:"#888"}} onClick={() => profPhotoRef.current.click()}><FontAwesomeIcon icon={faCamera} /></button>
          <input type='file' name="profile" style={{display:"none"}} ref={profPhotoRef} onChange={handleImg} />
          <button style={btnStyle} onClick={setImgFunc} disabled={isLoading} >{isLoading ? "Changing..." : "change profile"}</button>
        </section>
        <br/>
        <section style={sectionStyle}>
        <label style={{display:"none"}}>change bio </label>
        <textarea  onChange={e => setBio(e.target.value)} value={bio} placeholder='put your new bio here...'/>
        <button style={btnStyle} onClick={setBioFunc} disabled={isBioLoading} >{isBioLoading ? "Changing..." : "Change Bio"}</button>
        </section>
      </>        
    }
    
  return (
    <>
    <Nav/>
    <form onSubmit={setImgFunc} style={{marginTop:"7rem" , width:"100%" , display:"flex" , flexDirection:"column" ,justifyContent:"center" , alignItems:"center"}}>
        
        <div style={{maxWidth:"100px" , maxHeight:"100px" , borderRadius:"50%" , overflow:"hidden"}} className='img-cont-profile'>
            <img style={{display:"block" , maxWidth:"100%"}} src={`${url}/${user?.profile}`} alt='profile' />
        </div>
        <p>{user?.username}</p>
        <p>{user?.bio}</p>
        {edit}
    </form>

    {user ? <UserPosts userId={user?.id} /> : <></> }
    </>
  )
}

export default Profile
