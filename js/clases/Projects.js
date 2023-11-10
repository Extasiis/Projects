class Projects{
    constructor(){
        this.projects = []
    }

    agregarProjects(project){
        this.projects = [...this.projects, project];
    }

    deleteProject(id){
        this.projects = this.projects.filter(project => project.id !== id)
    }

    editProject(projectActualizado){
        this.projects = this.projects.map( project => project.id === projectActualizado.id ? projectActualizado : project)
    }
}

export default Projects; 