import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    fetchProfileAPI,
    editProfileAPI,
    updatePasswordAPI
} from "./profileAPI";




// Get Profile Thunk

export const getProfile = createAsyncThunk(

    "profile/getProfile",

    async (_, { rejectWithValue }) => {

        try {

            const response = await fetchProfileAPI();

            return response.user;

        }
        catch(error){

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch profile"
            );

        }

    }

);





// Update Profile Thunk

export const updateProfile = createAsyncThunk(

    "profile/updateProfile",

    async(data,{rejectWithValue})=>{

        try{

            const response = await editProfileAPI(data);

            return response.user;

        }
        catch(error){

            return rejectWithValue(
                error.response?.data?.message ||
                "Profile update failed"
            );

        }

    }

);





// Change Password Thunk

export const changePassword = createAsyncThunk(

    "profile/changePassword",

    async(data,{rejectWithValue})=>{

        try{

            const response = await updatePasswordAPI(data);

            return response.message;

        }
        catch(error){

            return rejectWithValue(
                error.response?.data?.message ||
                "Password change failed"
            );

        }

    }

);