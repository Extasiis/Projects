import { editProject, deleteProject } from '../functions.js';
import { formulario, projectsContainer } from '../selector.js'

class UI{

    imprimirAlert(mensaje, tipo){
        const mensajeAlert = document.createElement('p');
        mensajeAlert.classList.add('mensaje');
        if( tipo === 'error'){
            mensajeAlert.classList.add('error')

        } else{
            mensajeAlert.classList.add('success')
        }

        mensajeAlert.textContent = mensaje;

        // AddMensaje
        formulario.appendChild(mensajeAlert);

        setTimeout(() => {
            mensajeAlert.remove();
        }, 3000);
    }


    showProjects({projects}){

        this.cleanProjects();

        projects.forEach(project => {
            const {title, technology, description, phone, image, date, time, progress, id} = project;

            const cardProject = document.createElement('div');
            cardProject.classList.add('projects__card');
            cardProject.dataset.id = id;

            cardProject.innerHTML = `
            <div class="project__card-header">
                <img class="projects__card-img" src="${image}" alt="Project image" id="card-img" width="250" height="150">
            </div>
            <div class="projects__card-body">
                <h2 class="projects__card-name">${title}</h2>
                <div class="proyects__car-row-2">
                    <h3 class="projects__card-title" id="card-tecnologi">${technology}</h3>
                    <div class="edit-card">
                    </div>
                </div>
                <progress class='card__progress' type="range" value="${progress}" min="0" max="100" id="" name=""/></progress>
                </div>
                <p class="projects__card-description" id="card-description">
                    ${description}
                </p>
                <div class="proyects__car-row-3">
                <p class="projects__card-phone" id="card-phone">${phone}<span></span></p>
                <p class="projects__card-fecha" >
                    <span id="card-fecha">${date}</span>
                    <span id="card-hora">${time}</span>
                </p>
                </div>        
            </div>
            `



            const btnEdit = document.createElement('button')
            btnEdit.classList.add('card-config', 'editar');
            btnEdit.innerHTML= `
                <img src="img/editar.png" alt="">
            `
            btnEdit.onclick = () => editProject(project);

            const btnDelete = document.createElement('button')
            btnDelete.classList.add('card-config', 'delete');
            btnDelete.innerHTML= `
                <img src="img/eliminar.png" alt="">
            `
            btnDelete.onclick = () => deleteProject(id);

            cardProject.appendChild(btnEdit);
            cardProject.appendChild(btnDelete);

            projectsContainer.appendChild(cardProject);
        });
    }

    cleanProjects(){
        while (projectsContainer.firstChild) {
            projectsContainer.removeChild(projectsContainer.firstChild);
        }
    }
}

export default UI;