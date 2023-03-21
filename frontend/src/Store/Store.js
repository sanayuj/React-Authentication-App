import {configureStore} from '@reduxjs/toolkit'
import editUserReducer from "../Features/UserSlice"

export default configureStore({
    reducer:{
        user:editUserReducer
    }
})