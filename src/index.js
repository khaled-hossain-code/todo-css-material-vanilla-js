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
}

//Add Task
function addTask(e) {
  if (!taskInput.value) {
    e.preventDefault();
    return;
  }

  let li = document.createElement("li");
  li.className = "collection-item"; // add class
  li.appendChild(document.createTextNode(taskInput.value));

  let link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = `<icon class="fa fa-times"></i>`;
  li.appendChild(link);

  console.log(li);
  taskList.appendChild(li);
  taskInput.value = "";

  e.preventDefault();
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }
}