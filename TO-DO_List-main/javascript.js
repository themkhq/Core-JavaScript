document.addEventListener('DOMContentLoaded', loadTask);
function loadTask(){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDom(task);
    });
}
function addTask(){
    let taskInputVal = document.getElementById('taskInput').value;
    if(!taskInputVal){
        alert('Task cannot be empty');
        return;
    }

    addTaskToDom(taskInputVal);
    addTaskToLocalStorage(taskInputVal);
    document.getElementById('taskInput').value = '';
}

function addTaskToDom(task){
    let taskList = document.getElementById('taskList');
    let newTask = document.createElement('li');
    newTask.innerHTML = `
    ${task}
    <div>
    <span class="edit" onclick="editTask(this)">Edit</span>
    <span class="delete" onclick="delTask(this)">Del</span>
    </div>`;
    taskList.appendChild(newTask);
}

function addTaskToLocalStorage(task){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function delTask(element){
    let task = element.parentElement.parentElement;
    let taskText = task.innerText;
    task.remove();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(item => item !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(element){
    let task = element.parentElement.parentElement;
    let taskText = task.innerText;
    let newTask = prompt('Edit Task', taskText);
    if(newTask){
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(item => item === taskText ? newTask : item);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        task.innerHTML = `
        ${newTask}
        <div>
        <span class="edit" onclick="editTask(this)">Edit</span>
        <span class="delete" onclick="delTask(this)">Del</span>
        </div>`;
    }
}