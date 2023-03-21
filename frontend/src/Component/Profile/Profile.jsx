import axios from 'axios';
import { useState, useEffect } from 'react'
import './Profile.css'
import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [user, setUser] = useState(null)
    const [editImage, setEditImage] = useState(null)
    const [profilePic, setProfilePic] = useState(null)


    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate("/login");
            } else {
                const { data } = await axios.post("http://localhost:4000", {}, { withCredentials:true});
                if (!data.status) {
                    removeCookie("jwt");
                    navigate("/login")
                } else {
                    let userDetails = { ...data }
                    let profilePic = userDetails.image ? `http://localhost:4000/${userDetails.image}` : "https://www.w3schools.com/howto/img_avatar2.png"
                    setProfilePic(profilePic)
                    setUser(userDetails)
                }
            }
        }
        verifyUser();
    }, [cookies, navigate, removeCookie, profilePic])
    function logout() {
        removeCookie("jwt")
        navigate("/login")
    }

    function upload(e) {
        let file = e.target.files[0]
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          toast("Please upload a JPEG or PNG image file.",{
            position:"top-center"
        });
        } else {
        setEditImage(file)
          
        }

    }
//function for image upload 

    function uploadImage() {
        if (!editImage) {
            toast("Please select an image")
        }
        const formData = new FormData()
        formData.append('image', editImage)
        axios.post("http://localhost:4000/uploadimage", formData, { withCredentials: true }).then((data) => {
            let userDetails = { ...data.data }
            let dp = userDetails.image
            setProfilePic(dp)
            setEditImage(null)
            toast("Image uploaded succesfuly", { position: 'top-center' })
        })
    }
    return (
        <div className="border userbody profile">

            <div className="d-flex justify-content-center mb-4">
                <div style={{ position: "relative" }} className="bg-dark  rounded-circle">
                    <img src={editImage ? URL.createObjectURL(editImage) : profilePic} alt="" width={150} height={150} className="picture" />
                    <label htmlFor="camera-upload" className="camera-upload-label">
                        <i className="fa fa-camera" aria-hidden="true" ></i>
                    </label>
                    <input type="file" onChange={upload} id="camera-upload" className="camera-upload-input" accept="image/*;capture=camera" />
                </div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
                {editImage ? <button onClick={uploadImage} className='btn-success'>Save Image</button> : ""}
            </div>

            <div className="d-flex flex-column mb-3" >
                {user ? <input type="text" className='inputtag' value={`${user.username}`} disabled={true} placeholder='Email' /> : ""}
            </div>
            <div className="d-flex flex-column mb-3" >
                {user ? <input type="text" className='inputtag' value={`${user.useremail}`} disabled={true} placeholder='Email' /> : ""}
            </div>
            <div style={{ textAlign: 'center' }}>  <button onClick={logout}>Log out</button></div>
        </div>
    )
}

export default Profile