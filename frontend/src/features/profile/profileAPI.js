import {
    getProfileAPI,
    updateProfileAPI,
    changePasswordAPI
} from "@/services/profile.api";


// Get Profile

export const fetchProfileAPI = async () => {

    return await getProfileAPI();

};



// Update Profile

export const editProfileAPI = async (data) => {

    return await updateProfileAPI(data);

};



// Change Password

export const updatePasswordAPI = async (data) => {

    return await changePasswordAPI(data);

};