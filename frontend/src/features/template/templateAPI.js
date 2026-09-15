import api from "@/services/api";


// ===============================
// SYSTEM TEMPLATES
// ===============================


export const getSystemTemplatesAPI = async () => {

    const response = await api.get(
        "/templates/system"
    );

    return response.data;

};



export const getSystemTemplateAPI = async(type)=>{


    const response = await api.get(
        `/templates/system/${type}`
    );


    return response.data;

};




export const cloneSystemTemplateAPI = async(
    type,
    data
)=>{


    const response = await api.post(
        `/templates/system/${type}/clone`,
        data
    );


    return response.data;

};





// ===============================
// PROJECT TEMPLATES
// ===============================



export const getProjectTemplatesAPI = async(
    projectId
)=>{


    const response = await api.get(
        `/templates/projects/${projectId}/templates`
    );


    return response.data;

};






export const getSingleTemplateAPI = async(
    projectId,
    id
)=>{


    const response = await api.get(
        `/templates/projects/${projectId}/templates/${id}`
    );


    return response.data;

};







export const createTemplateAPI = async(
    projectId,
    data
)=>{


    const response = await api.post(
        `/templates/projects/${projectId}/templates`,
        data
    );


    return response.data;

};








export const updateTemplateAPI = async(
    projectId,
    id,
    data
)=>{


    const response = await api.put(
        `/templates/projects/${projectId}/templates/${id}`,
        data
    );


    return response.data;

};








export const deleteTemplateAPI = async(
    projectId,
    id
)=>{


    const response = await api.delete(
        `/templates/projects/${projectId}/templates/${id}`
    );


    return response.data;

};









// ===============================
// PREVIEW
// ===============================



export const previewTemplateAPI = async(
    projectId,
    id,
    data
)=>{


    const response = await api.post(
        `/templates/projects/${projectId}/templates/${id}/preview`,
        data
    );


    return response.data;

};







export const previewEditorTemplateAPI = async(
    data
)=>{


    const response = await api.post(
        "/templates/editor-preview",
        data
    );


    return response.data;

};









// ===============================
// VARIABLES
// ===============================


export const getTemplateVariablesAPI = async(
    id
)=>{


    const response = await api.get(
        `/templates/${id}/variables`
    );


    return response.data;

};




export const extractEditorVariablesAPI = async(
    data
)=>{


    const response = await api.post(
        "/templates/editor-variables",
        data
    );


    return response.data;

};





export const validateTemplateVariablesAPI = async(
    id,
    data
)=>{


    const response = await api.post(
        `/templates/${id}/validate`,
        data
    );


    return response.data;

};