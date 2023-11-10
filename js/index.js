const navegation = document.querySelector('.main__btn');
const slider = document.querySelector('.menu');
const create = document.querySelector('#create');
const form = document.querySelector('.projescts__formulation');
const closeBtn = document.querySelector('.gg-close');
const projectsContainer = document.querySelector('.projects__container');
let edit;

const checkbox = document.querySelector('.dark-mode__check')

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    checkbox.setAttribute('checked', true)
}

checkbox.addEventListener('change', function(event) {
    document.body.classList.toggle('is-light');
    document.body.classList.toggle('is-dark');
})

//Imput form variables
const formulario = document.querySelector('.projects-form');
const titleInput = document.querySelector('#form-title');
const technologyInput = document.querySelector('#form-technology');
const descriptionInput = document.querySelector('#form-description');
const phoneInput = document.querySelector('#form-phone');
const imageInput = document.querySelector('#form-image');
const dateInput = document.querySelector('#form-date');
const timeInput = document.querySelector('#form-time');
const progessInput = document.querySelector('#form-progess');
const submitInput = document.querySelector('#form-submit');
const containerProjects = document.querySelector('.projects__container');
const imagePreview = document.querySelector('.image-preview');



// Class
class Projects{
    constructor(){
        this.projects = []
    }

    agregarProjects(project){
        this.projects = [...this.projects, project];
        console.log(this.projects);
    }

    deleteProject(id){
        this.projects = this.projects.filter(project => project.id !== id)
    }

    editProject(projectActualizado){
        this.projects = this.projects.map( project => project.id === projectActualizado.id ? projectActualizado : project)
    }
}

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
                        <button class="card-config" onClick="deleteProject(${id})" id="delete"><img src="img/eliminar.png" alt=""></button>
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

            cardProject.appendChild(btnEdit)
            projectsContainer.appendChild(cardProject);
        });
    }

    cleanProjects(){
        while (projectsContainer.firstChild) {
            projectsContainer.removeChild(projectsContainer.firstChild);
        }
    }
}

const ui = new UI();
const adminProyects = new Projects();


addEventListener()
function addEventListener(){
    navegation.addEventListener('click', navegationEvent);
    create.addEventListener('click', createProjects);
    closeBtn.addEventListener('click', createProjects);

    // EVENTO FORMULARIO
    titleInput.addEventListener('input', dateProject);
    technologyInput.addEventListener('input', dateProject);
    descriptionInput.addEventListener('input', dateProject);
    phoneInput.addEventListener('input', dateProject);
    // imageInput.addEventListener(onchange, dateProject);
    dateInput.addEventListener('input', dateProject);
    timeInput.addEventListener('input', dateProject);
    submitInput.addEventListener('input', dateProject);
    formulario.addEventListener('submit', addProject);
}

function navegationEvent(){
    navegation.classList.toggle('active');
    slider.classList.toggle('active');
}

function createProjects(){
    form.classList.toggle('active')
}

//Objects
const projectObj = {
    title: '',
    technology: '',
    description: '',
    phone: '',
    image: '',
    date: '',
    time: '',
    progress: '',
}

//Add date the Obj
function dateProject(e){
    projectObj[e.target.name] = e.target.value;
    projectObj.progress = progessInput.value;
}

function dateImage(e){    
    const inputImg = e.target;

    const imgPreview = document.querySelector('#imgPreview');

    if (!inputImg.files.length) return

    file = inputImg.files[0];

    const objectURL = URL.createObjectURL(file);

    imagePreview.src = objectURL;
    projectObj.image = objectURL;
}

//Valid and Add Projects
function addProject(e){
    e.preventDefault();

    //Extract
    const {title, technology, description, phone, image, date, time, progress} = projectObj;

    if(title === ''|| technology === '' || description === '' || phone === '' || date === '' || time === ''){
        ui.imprimirAlert('Add all fields', 'error');
        return
    }

    if(edit){
        ui.imprimirAlert('change', 'success');
        adminProyects.editProject({...projectObj});
        
        edit = false
    } else{        
        // ID
        projectObj.id = Date.now();

        //Envia una referencia
        adminProyects.agregarProjects({...projectObj});
        // Success
        ui.imprimirAlert('The project has been added', 'success')
    }

    

    // Reset Object and form
    resetObj();
    formulario.reset();

    //Show the HTML
    ui.showProjects(adminProyects)    
}

function resetObj(){
    projectObj.title = '';
    projectObj.technology = '';
    projectObj.description = '';
    projectObj.phone = '';
    projectObj.image = '';
    projectObj.date = '';
    projectObj.time = '';
    projectObj.progress = '';
}


function deleteProject(id){
    console.log(id);
    // delete projects
    adminProyects.deleteProject(id)
    // // show projects
    ui.showProjects(adminProyects)
}

function editProject({title, technology, description, phone, image, date, time, progress, id}){
    
    titleInput.value = title;
    technologyInput.value = technology;
    descriptionInput.value = description;
    phoneInput.value = phone;
    dateInput.value = date;
    timeInput.value = time;
    progessInput.value = progress;

    projectObj.title = title;
    projectObj.technology = technology;
    projectObj.description = description;
    projectObj.phone = phone;
    projectObj.image = '';
    projectObj.date = date;
    projectObj.time = time;
    projectObj.progress = progress;
    projectObj.id = id;

    edit = true;

    createProjects();
    submitInput.textContent = 'Edit'
}