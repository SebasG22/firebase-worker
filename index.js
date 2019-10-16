const worker = new Worker('worker.js');
const projectNameRef = document.querySelector('#projectName');
const projectDescRef = document.querySelector('#projectDesc');
const createProjectBtnRef = document.querySelector('#createProjectBtn');
const getProjectsBtnRef = 
document.querySelector('#getProjectsBtn');

createProjectBtnRef.addEventListener('click', ()=>{
    sendMessage({ action: 'CREATE_PROJECT', data: { 
        name: document.querySelector('#projectName').value,
        desc: document.querySelector('#projectDesc').value,
    }});

    projectNameRef.value ='';
    projectDescRef.value ='';
});

getProjectsBtnRef.addEventListener('click', ()=>{
    sendMessage({ action: 'GET_PROJECTS'});
});



function sendMessage(message){
    worker.postMessage(message)
}
