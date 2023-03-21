
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'

function EditUser() {
    const navigate = useNavigate()
    const [values,setValues] = useState({
        id:"",
        name:"",
        email:""
    })

    const generateError=(err)=>{
        toast.error(err,{
            position:"top-center"
        })
    }

    const user = useSelector((state) => state.user);
    useEffect(()=>{
        setValues({...values,id:user.id,name:user.name,email:user.email})
        
    },[])

    function edit(e){
       
            setValues({...values,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
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
    if (Object.keys(errors).length > 0) {
        // Display error messages for invalid inputs
      //   generateError(errors);
      } else {
        const res = await axios.post('http://localhost:4000/admin/editUser', values)
        const data =res.data
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
        }
    }

    return (
        <div>
            <div className="conatiner userbody">
                <form>
                    <h2> Edit User </h2>
                    <div className='d-none'>
                        <label htmlFor="Name">Name</label>
                        <input type="text"  value={values.id} onChange={(e)=>edit(e)}  name="id" placeholder="name" />
                    </div>
                    <div>
                        <label htmlFor="Name">Name</label>
                        <input type="text" value={values.name} onChange={(e)=>edit(e)}  name="name" placeholder="name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={values.email} onChange={(e)=>edit(e)}  name="email" placeholder="email" />
                    </div>
                 
                    <button type="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditUser;