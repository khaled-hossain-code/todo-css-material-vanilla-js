//Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener('click', removeAll);
  filter.addEventListener('keyup', filterTasks);
}

//load task
function loadTask() {
  let tasks = _getTasks();

  tasks.forEach( task => {
    createTaskAndAppend(task);
  })
}

//Add Task
function addTask(e) {
  if (!taskInput.value) {
    e.preventDefault();
    return;
  }

  createTaskAndAppend(taskInput.value);
  //Add to local storage
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = "";

  e.preventDefault();
}

function createTaskAndAppend (task) {
  let li = document.createElement("li");
  li.className = "collection-item"; // add class
  li.appendChild(document.createTextNode(task));

  let link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = `<icon class="fa fa-times"></i>`;
  li.appendChild(link);

  taskList.appendChild(li);
}

function storeTaskInLocalStorage(task) {
  let tasks = _getTasks();

  tasks.push(task);
  console.log(tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTasksFromLocalStorage(task) {
  let tasks = _getTasks();

  let index = tasks.indexOf(task);

  if (index !== -1) { tasks.splice(index, 1); }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function _getTasks(){
  let tasks = localStorage.getItem('tasks');

  if (tasks === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(tasks);
  }
  return tasks;
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if(confirm('Are you sure?')) {
      let li = e.target.parentElement.parentElement;
      li.remove();
      removeTasksFromLocalStorage(li.innerText);
    }
  }
}

function removeAll(e) {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.removeItem('tasks');
}

//filter tasks
function filterTasks(e) {
  let searchTerm = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach( task => {
    if(task.innerText.toLowerCase().indexOf(searchTerm) !== -1) {
      task.style.display = 'block';
    }else {
      task.style.display = 'none';
    }
  })
}

loadTask();