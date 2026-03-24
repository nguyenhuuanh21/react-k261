import { createSlice } from "@reduxjs/toolkit";
const initialState={
    auth:{
        isAuthenticated:false,
        accessToken:null,
        error:false
    },
    customer:{
        current:null
    }
}
const authReducer=createSlice({
    name:"authReducer",
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.auth.isAuthenticated=true;
            state.auth.accessToken=action.payload.accessToken;
            state.auth.error=false;
            state.customer.current=action.payload.user;
        },
        updateProfile:(state,action)=>{
            state.customer.current=action.payload.updatedProfile;
        },
        logout:(state,action)=>{
            state.auth.isAuthenticated=false;
            state.auth.accessToken=null;
            state.auth.error=false;
            state.customer.current=null;
        },
        refreshTokenSuccess:(state,action)=>{
            state.auth.accessToken=action.payload.newAccessToken;
        }
    }
})
export default authReducer.reducer;
export const {loginSuccess,updateProfile,logout,refreshTokenSuccess}=authReducer.actions;