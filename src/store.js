import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
const mystore = configureStore({
    reducer:{
        usersl:userSlice
    }
})
export default mystore;