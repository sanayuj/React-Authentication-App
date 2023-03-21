import {createSlice} from "@reduxjs/toolkit"



const initialState={
     name:"",
     id:"",
     email:"",
}


const editUserSlice =createSlice({
    name:"editUser",
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.id=action.payload.id;
            state.name=action.payload.name;
            state.email=action.payload.email;
        }
    }
})


export const {setUserDetails}=editUserSlice.actions;

export default editUserSlice.reducer