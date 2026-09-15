import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import ProjectDetails from "./pages/ProjectDetails";


const ProjectRoutes = [

    {
        path:"/dashboard/projects",
        element:<Projects/>
    },


    {
        path:"/dashboard/projects/create",
        element:<CreateProject/>
    },


    {
        path:"/dashboard/projects/:id",
        element:<ProjectDetails/>
    },


    {
        path:"/dashboard/projects/:id/edit",
        element:<EditProject/>
    }

];


export default ProjectRoutes;