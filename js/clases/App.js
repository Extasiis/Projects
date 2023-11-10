import {
    navegationEvent,
    createProjects,
    dateProject,
    addProject,
    darkmode,
    dateImage
} from '../functions.js'

import { 
    formulario, 
    navegation,
    titleInput,
    technologyInput,
    descriptionInput,
    phoneInput,
    dateInput,
    timeInput,
    submitInput,
    checkbox,
    create,
    closeBtn,
    imageInput
} from '../selector.js';

class App {
    constructor(){
        this.initApp();
    }

    initApp(){
        navegation.addEventListener('click', navegationEvent);
        create.addEventListener('click', createProjects);
        closeBtn.addEventListener('click', createProjects);

        // EVENTO FORMULARIO
        titleInput.addEventListener('input', dateProject);
        technologyInput.addEventListener('input', dateProject);
        descriptionInput.addEventListener('input', dateProject);
        phoneInput.addEventListener('input', dateProject);
        imageInput.addEventListener('change', dateImage);
        dateInput.addEventListener('input', dateProject);
        timeInput.addEventListener('input', dateProject);
        submitInput.addEventListener('input', dateProject);
        formulario.addEventListener('submit', addProject);
        checkbox.addEventListener('change', darkmode);
    }
}

export default App;