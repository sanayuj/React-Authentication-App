import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import axios from "axios"

function Signup() {
    const navigate=useNavigate()
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:""
    });

    const generateError=(err)=>{
        toast.error(err,{
            position:"top-center"
        })
    }

async function handleSubmission(e) {
    e.preventDefault();
  
    const errors = {};
  
    if (!values.name) {
      errors.name = 'Name is required';
      generateError(errors.name);
    }else if (/\s/.test(values.name)) {
        errors.name = 'Name cannot contain white spaces';
        generateError(errors.name)
      }else if (/[^a-zA-Z0-9]/.test(values.name)) {
        errors.name = 'Name cannot contain special characters';
        generateError(errors.name)
      }else if (values.name.length<3){
        errors.name='Name must be at least 3 characters long';
        generateError(errors.name)
      }
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Email is invalid';
      generateError(errors.email);

    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 5) {
      errors.password = 'Password must be at least 5 characters long';
      generateError(errors.password);

    }
  
    if (Object.keys(errors).length > 0) {
      generateError(errors);
    } else {
      try {
        const {data}=await axios.post("http://localhost:4000/signup",{
            ...values
        });
        if(data){
            if(data.errors){
                const {name,email,password} = data.errors;
                if(name) generateError(name);
                else if(email) generateError(email);
                else if(password) generateError(password);
            }else{
                navigate("/")
            }
        }
    } catch (error) {
        generateError(error)
    }
    }
  }
    return (
        <div className="conatiner userbody">
            <form onSubmit={(e)=>handleSubmission(e)}>
            <h2>Register Account</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="name" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="email" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
                </div>

                <div>
                    <label htmlFor="Password">Password</label>
                    <input type="password" name="password" placeholder="password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
                </div>
                <button type="submit">Submit</button>
                <span>
                    Already have an account? <Link to={"/login"}>Login</Link>
                </span>
            </form>
        </div>
    )
}

export default Signup;