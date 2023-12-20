import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faCamera } from "@fortawesome/free-solid-svg-icons"
import { useRef, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useAddPostMutation } from "../main/posts/postApiSlice"


const Modal = ({ modalopen, setModalOpen }) => {
    const [addPost, { isLoading ,  }] = useAddPostMutation()
    let classForModal
    const auth = useAuth()
    const modalRef = useRef()
    const [preview, setPreView] = useState(null)
    const [sizeError, setSizeError] = useState("")
    const [img, setImg] = useState(null)
    const [caption, setCaption] = useState("")
    if (modalopen) {
        classForModal = "active"
    } else {
        classForModal = ""

    }

    const onPicChange = (e) => {
        setPreView(URL.createObjectURL(e.target.files[0]))
        setImg(e.target.files[0])
    }


    let imgCon
    if (preview) {
        imgCon = <img src={preview} alt="preview" />
    } else {
        imgCon = <label>choose your picture</label>
    }

    /* const canSave = img && caption && !isLoading */
    let text
    if (isLoading) {
        text = "posting..."
    } else {
        text = "post"
    }

    const postNew = async(e) => {
        e.preventDefault()

        if (!img || !caption) {
            return
        }
        
        const formData = new FormData()
        formData.append("postImg", img)
        formData.append("caption", caption)
        formData.append("user", auth?.userId)

        if (img.size >= 1024*1024) {
            setSizeError("file is large , max size is 1mb")
            return
        }

        try {
            await addPost(formData)
            setModalOpen('')
            setSizeError("")
            setImg(null)
            setPreView(null)
            setCaption("")
            
        } catch (error) {
            console.log(1);
        }
    }

    let modal =
        <section className={`modal-Wrapper ${classForModal}`}>
            <button className='modal-x-btn' onClick={() => setModalOpen(false)}><FontAwesomeIcon icon={faClose} /></button>
            <div className='modal'>
                <div className="imgSection">
                    <section className="post-add-btn-section">
                        <button className="btn" onClick={() => modalRef.current.click()}><FontAwesomeIcon icon={faCamera} /></button>
                        {imgCon}
                    </section>
                </div>
                <form onSubmit={postNew}>
                    <input type="file" name="postImg" hidden ref={modalRef} onChange={onPicChange} />
                    <input style={{ width: "100%", height: "40px", fontSize: "1rem", textAlign: "center", outline: "none", border: "none", marginTop: "1rem" }} type="text" placeholder='please enter your caption' value={caption} onChange={(e) => setCaption(e.target.value)} />
                    <p style={{color:"red"}} >{sizeError}</p>
                    <button className="btn post-btn" onClick={postNew}  disabled={isLoading} >{text}</button>
                </form>
            </div>
        </section>

    return modal
}

export default Modal