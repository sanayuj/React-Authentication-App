import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Features/UserSlice';
import {useCookies} from 'react-cookie'


function AdminHome() {
    const navigate = useNavigate()
    const [usersData, setUsersData] = useState()

    const [cookies,setCookie,removeCookie] = useCookies([]);
    const dispatch = useDispatch();

    async function getUsersData() {
        const res = await axios.get("http://localhost:4000/admin",{ withCredentials:true });
        const data = await res.data


        if(!data.status){
            removeCookie("admin_jwt")
            navigate("/adminlogin")
        }

        if (res.status === '201' || data.status) {
            let users = data.usersData
            setUsersData(users)
        }
        if (!data || res.status === '422')
            toast("Something went wrong")
    }

    useEffect(() => {
        
        if(!cookies.admin_jwt){
            navigate("/adminlogin");
        }
        getUsersData()

    },[cookies,navigate,removeCookie])

//delete user from admin side
    async function deleteUser(id) {
        const res2 = await axios.post(`http://localhost:4000/admin/deleteuser/${id}`)
        const data = res2.data
        if (res2.status === 201 || data) {
            toast("User deleted", {
                style: {
                    backgroundColor: "white",
                    color: "red"
                }
            })
            getUsersData()
        }

    }

    function adminLogOut(){
            removeCookie("admin_jwt")
            navigate("/adminlogin")
        
    }



    return (
        <div>
            <header >
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid d-flex justify-content-between">
                        <a className="navbar-brand" href='/#'>Admin Panel</a>
                        <button onClick={adminLogOut}>log out</button>

                    </div>
                </nav>
            </header>
            <section className='container'>
                <div className='text-end mb-2'>
                    <Link to={'/adduser'}>  <button className='btn-success'><i className="fa fa-plus " aria-hidden="true"></i> Add User</button></Link>
                </div>
                <table className="table">
                    <thead >
                        <tr className='bg-dark text-white'>
                            <th scope="col">id</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           
                            usersData && usersData.map((user, id) => {
                                return (
                                    <tr key={id}>
                                        <th scope="row">{id + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td><div className='d-flex justify-content-center'>

                                             <div className='me-2'><button onClick={() => {
                                                dispatch(
                                                    setUserDetails({
                                                        id: user._id,
                                                        name: user.name,
                                                        email: user.email,
                                                    })
                                                );
                                                navigate("/editUser");
                                            }}><i className="fa fa-pencil" aria-hidden="true"></i></button></div>
                                            <div > <button className='bg-danger' onClick={() => deleteUser(user._id)}><i className="fa fa-trash" aria-hidden="true"></i></button></div>
                                        </div>
                                        </td>
                                    </tr>
                                )
                            }) 
                        }


                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default AdminHome