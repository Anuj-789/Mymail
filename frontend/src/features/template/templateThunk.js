import { createAsyncThunk } from "@reduxjs/toolkit";


import {

getSystemTemplatesAPI,
getSystemTemplateAPI,
cloneSystemTemplateAPI,

getProjectTemplatesAPI,
getSingleTemplateAPI,

createTemplateAPI,
updateTemplateAPI,
deleteTemplateAPI,

previewTemplateAPI,
previewEditorTemplateAPI,

getTemplateVariablesAPI,
extractEditorVariablesAPI,
validateTemplateVariablesAPI


} from "./templateAPI";




// SYSTEM


export const fetchSystemTemplates =
createAsyncThunk(

"template/system",

async()=>{

return await getSystemTemplatesAPI();

}

);






export const fetchSystemTemplate =
createAsyncThunk(

"template/singleSystem",

async(type)=>{

return await getSystemTemplateAPI(type);

}

);






export const cloneSystemTemplate =
createAsyncThunk(

"template/cloneSystem",

async({type,data})=>{

return await cloneSystemTemplateAPI(
type,
data
);

}

);







// PROJECT TEMPLATE



export const fetchProjectTemplates =
createAsyncThunk(

"template/projectTemplates",

async(projectId)=>{

return await getProjectTemplatesAPI(
projectId
);

}

);







export const fetchSingleTemplate =
createAsyncThunk(

"template/single",

async({projectId,id})=>{


return await getSingleTemplateAPI(
projectId,
id
);


}

);







export const createTemplate =
createAsyncThunk(

"template/create",

async({projectId,data})=>{


return await createTemplateAPI(
projectId,
data
);


}

);






export const updateTemplate =
createAsyncThunk(

"template/update",

async({projectId,id,data})=>{


return await updateTemplateAPI(
projectId,
id,
data
);


}

);







export const deleteTemplate =
createAsyncThunk(

"template/delete",

async({projectId,id})=>{


return await deleteTemplateAPI(
projectId,
id
);


}

);









// PREVIEW



export const previewTemplate =
createAsyncThunk(

"template/preview",

async({projectId,id,data})=>{


return await previewTemplateAPI(
projectId,
id,
data
);


}

);







export const previewEditor =
createAsyncThunk(

"template/editorPreview",

async(data)=>{


return await previewEditorTemplateAPI(
data
);


}

);









// VARIABLES



export const fetchTemplateVariables =
createAsyncThunk(

"template/variables",

async(id)=>{


return await getTemplateVariablesAPI(
id
);


}

);






export const extractEditorVariables =
createAsyncThunk(

"template/extractVariables",

async(data)=>{


return await extractEditorVariablesAPI(
data
);


}

);






export const validateTemplateVariables =
createAsyncThunk(

"template/validateVariables",

async({id,data})=>{


return await validateTemplateVariablesAPI(
id,
data
);


}

);