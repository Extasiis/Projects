import UI from './clases/Ui.js';
import Projects from './clases/Projects.js';

import { 
    imagePreview, 
    formulario, 
    navegation, 
    slider,
    form,
    titleInput,
    technologyInput,
    descriptionInput,
    phoneInput,
    dateInput,
    timeInput,
    progessInput,
    submitInput,
    checkbox
    
} from './selector.js';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    checkbox.setAttribute('checked', true)
}


// Class
const ui = new UI();
const adminProyects = new Projects();


let edit;

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

export function navegationEvent(){
    navegation.classList.toggle('active');
    slider.classList.toggle('active');
}

export function createProjects(){
    form.classList.toggle('active')
}

//Add date the Obj
export function dateProject(e){
    projectObj[e.target.name] = e.target.value;
    projectObj.progress = progessInput.value;
}

export function dateImage(e){    
    const inputImg = e.target;

    if (!inputImg.files.length){
        console.log('No tiene Imagen');
        return
    } 

    const file = inputImg.files[0];

    const objectURL = URL.createObjectURL(file);

    imagePreview.src = objectURL;
    projectObj.image = objectURL;
}

//Valid and Add Projects
export function addProject(e){
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

export function resetObj(){
    projectObj.title = '';
    projectObj.technology = '';
    projectObj.description = '';
    projectObj.phone = '';
    projectObj.image = '';
    projectObj.date = '';
    projectObj.time = '';
    projectObj.progress = '';
}


export function deleteProject(id){
    console.log(id);
    // delete projects
    adminProyects.deleteProject(id)
    // // show projects
    ui.showProjects(adminProyects)
}

export function editProject({title, technology, description, phone, image, date, time, progress, id}){
    
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

export function darkmode(){
    document.body.classList.toggle('is-light');
    document.body.classList.toggle('is-dark');
}

