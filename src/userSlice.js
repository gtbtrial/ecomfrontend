import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:false,
    uinfo:null
}
const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        login(state,action)
        {
            state.isLoggedIn=true;
            state.uinfo=action.payload;
        },
        logout(state,action)
        {
            state.isLoggedIn=false;
            state.uinfo=null
        }
    }
})
export const {login,logout} = userSlice.actions;
export default userSlice.reducer;