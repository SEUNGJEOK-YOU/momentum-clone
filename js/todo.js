const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "toDos";

let toDos = [];

function saveToDo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentNode;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDo();
}

function paintToDo(toDoObj) {
  const li = document.createElement("li");
  li.id = toDoObj.id;
  const span = document.createElement("span");
  span.innerText = toDoObj.text;
  const button = document.createElement("button");
  button.innerText = "⨉";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoFormSubmit(event) {
  event.preventDefault();
  const toDo = toDoInput.value;
  toDoInput.value = "";
  const toDoObj = { text: toDo, id: Date.now() };
  toDos.push(toDoObj);
  paintToDo(toDoObj);
  saveToDo();
}

toDoForm.addEventListener("submit", handleToDoFormSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos != null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
