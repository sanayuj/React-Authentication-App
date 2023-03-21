import React, { useState } from "react";
import {Link ,useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import axios from "axios";
import {useCookies} from 'react-cookie'


function AdminLogin() {
    const [cookies,setCookie,removeCookie] = useCookies([]);

    const navigate=useNavigate()
    const [values,setValues]=useState({
        email:"",
        password:""
    });

    const generateError=(err)=>{
        toast.error(err,{
            position:"top-center"
        })
    }
async function handleSubmission(e){
    e.preventDefault();
    try {
        const {data}=await axios.post("http://localhost:4000/admin/adminlogin",{
            ...values
        });
        if(data){
            if(data.errors){
                const {email,password} = data.errors;
                 if(email) generateError(email);
                else if(password) generateError(password);
            }else{
                setCookie('admin_jwt', `${data.jwt}`);
                navigate("/admin")
            }
        }
    } catch (error) {
        toast(error.message);
    }
}
    return (
        <div className="conatiner userbody">
            <form onSubmit={(e)=>handleSubmission(e)}>
            <h2>Admin Login</h2>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="email" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
                </div>

                <div>
                    <label htmlFor="Password">Password</label>
                    <input type="password" name="password" placeholder="password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AdminLogin;