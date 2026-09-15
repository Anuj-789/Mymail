import api from "./api";


// Get Logged In User Profile

export const getProfileAPI = async () => {

    const response = await api.get(
        "/profile"
    );

    return response.data;

};




// Update User Profile

export const updateProfileAPI = async (data) => {

    const response = await api.put(
        "/profile",
        data
    );

    return response.data;

};




// Change Password

export const changePasswordAPI = async (data) => {

    const response = await api.put(
        "/profile/change-password",
        data
    );

    return response.data;

};