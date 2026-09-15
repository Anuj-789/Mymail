import api from "@/services/api";



// Get All Projects

export const getProjectsAPI = async()=>{

    const response = await api.get(
        "/projects"
    );

    return response.data;

};





// Create Project

export const createProjectAPI = async(data)=>{

    const response = await api.post(
        "/projects",
        data
    );

    return response.data;

};





// Get Single Project

export const getProjectByIdAPI = async(id)=>{

    const response = await api.get(
        `/projects/${id}`
    );


    return response.data;

};





// Update Project

export const updateProjectAPI = async(id,data)=>{


    const response = await api.put(

        `/projects/${id}`,

        data

    );


    return response.data;


};






// Delete Project


export const deleteProjectAPI = async(id)=>{


    const response = await api.delete(

        `/projects/${id}`

    );


    return response.data;


};