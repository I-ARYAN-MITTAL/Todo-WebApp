const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", addTask);

function getTodoVal() {
  return JSON.parse(localStorage.getItem("todo"));
}
function addTodoListLocal(localTodoVal) {
  return localStorage.setItem("todo", JSON.stringify(localTodoVal));
}
let localTodoVal = getTodoVal() || [];

function addTaskDynamically(element) {
  const task = document.createElement("li");
  task.innerHTML = `<span>${element}</span> <button class="remove-task">Remove</button>`;
  taskList.appendChild(task);
  taskInput.value = "";
  task.querySelector(".remove-task").addEventListener("click", removeTask);
}

function addTask(e) {
  e.preventDefault();

  if (taskInput.value.trim() === "") return;

  const TodoListVal = taskInput.value.trim();

  if (!localTodoVal.includes(TodoListVal)) {
    localTodoVal.push(TodoListVal);
    localTodoVal = [...new Set(localTodoVal)];
    localStorage.setItem("todo", JSON.stringify(localTodoVal));
    const task = document.createElement("li");
    task.innerHTML = `<span>${taskInput.value}</span> <button class="remove-task">Remove</button>`;
    taskList.appendChild(task);
    taskInput.value = "";
    task.querySelector(".remove-task").addEventListener("click", removeTask);
  } else {
    taskInput.value = "";
  }
}
function showTodo() {
  localTodoVal.forEach((element) => {
    addTaskDynamically(element);
  });
}

showTodo();

function removeTask(e) {
  const task = e.target.previousElementSibling.innerText;
  const parentElem = e.target.parentElement;

  localTodoVal = localTodoVal.filter((el) => {
    return el !== task.toLowerCase();
  });

  addTodoListLocal(localTodoVal);
  parentElem.remove();
}
