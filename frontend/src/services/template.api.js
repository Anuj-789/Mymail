import api from "./api";


// Get all templates
export const getTemplatesAPI = async () => {

    const response = await api.get(
        "/templates"
    );

    return response.data;

};



// Get system templates
export const getSystemTemplatesAPI = async () => {

    const response = await api.get(
        "/templates/system"
    );

    return response.data;

};



// Get single template

export const getTemplateAPI = async(id)=>{

    const response = await api.get(
        `/templates/${id}`
    );


    return response.data;

};



// Create template

export const createTemplateAPI = async(data)=>{


    const response = await api.post(
        "/templates",
        data
    );


    return response.data;

};



// Update template

export const updateTemplateAPI = async(
    id,
    data
)=>{


    const response = await api.put(
        `/templates/${id}`,
        data
    );


    return response.data;

};




// Delete template

export const deleteTemplateAPI = async(id)=>{


    const response = await api.delete(
        `/templates/${id}`
    );


    return response.data;

};