import { useState } from 'react'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AddUser(){
  const navigate = useNavigate()
    const generateError=(err)=>{
        toast.error(err,{
            position:"top-center"
        })
    }

const [values,setValues] = useState({
    name:"",
    email:"",
    password:""
})

function userdata(e){
    setValues({...values,[e.target.name]:e.target.value})
}

function handleSubmission(e) {
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
      // Display error messages for invalid inputs
    //   generateError(errors);
    } else {
      // Make API call to submit the form
      axios.post('http://localhost:4000/admin/adduser', values)
        .then((response) => {
          const data = response.data;
          if (!data.status) {
            generateError(data.error);
          }
          if(data.status){
            toast.success(data.message, {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          navigate('/admin')
          }
        })
        .catch((error) => {
          generateError('An error occurred while submitting the form. Please try again later.');
        });
    }
  }
  

    return(
        <div className="conatiner userbody">
        <form>
        <h2> Add User</h2>

            <div>
                <label htmlFor="Name">Name</label>
                <input type="text" onChange={userdata} name="name" placeholder="Name"  />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={userdata} name="email" placeholder="email"  />
            </div>

            <div>
                <label htmlFor="Password">Password</label>
                <input type="password" onChange={userdata} name="password" placeholder="password"  />
            </div>
            <button type="submit" onClick={handleSubmission}>Submit</button>
            <span>
              
            </span>
       
        </form>
        </div>
    )
}

export default AddUser