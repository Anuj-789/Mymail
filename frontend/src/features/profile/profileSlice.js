import { createSlice } from "@reduxjs/toolkit";

import {
    getProfile,
    updateProfile,
    changePassword
} from "./profileThunk";



const initialState = {

    user:null,

    loading:false,

    passwordLoading:false,

    error:null,

    successMessage:null

};




const profileSlice = createSlice({

    name:"profile",

    initialState,


    reducers:{


        clearProfileMessage:(state)=>{

            state.successMessage=null;

            state.error=null;

        }


    },


    extraReducers:(builder)=>{


        builder


        // Get Profile

        .addCase(
            getProfile.pending,
            (state)=>{

                state.loading=true;

            }
        )


        .addCase(
            getProfile.fulfilled,
            (state,action)=>{

                state.loading=false;

                state.user=action.payload;

            }
        )


        .addCase(
            getProfile.rejected,
            (state,action)=>{

                state.loading=false;

                state.error=action.payload;

            }
        )





        // Update Profile


        .addCase(
            updateProfile.pending,
            (state)=>{

                state.loading=true;

            }
        )


        .addCase(
            updateProfile.fulfilled,
            (state,action)=>{

                state.loading=false;

                state.user=action.payload;

                state.successMessage=
                "Profile updated successfully";

            }
        )


        .addCase(
            updateProfile.rejected,
            (state,action)=>{

                state.loading=false;

                state.error=action.payload;

            }
        )





        // Change Password


        .addCase(
            changePassword.pending,
            (state)=>{

                state.passwordLoading=true;

            }
        )


        .addCase(
            changePassword.fulfilled,
            (state,action)=>{

                state.passwordLoading=false;

                state.successMessage=
                action.payload;

            }
        )


        .addCase(
            changePassword.rejected,
            (state,action)=>{

                state.passwordLoading=false;

                state.error=action.payload;

            }
        )


    }


});



export const {
    clearProfileMessage

}=profileSlice.actions;



export default profileSlice.reducer;