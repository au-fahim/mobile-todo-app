// SELECTOR
const formPopupBtn = document.querySelector(".form-popup-btn");
const todoForm = document.querySelector(".todo-form");

const todoInput = document.querySelector(".todo-input");
const todoAddBtn = document.querySelector(".todo-add-btn");
const todoList = document.querySelector(".todo-container");

const todoText = document.querySelector(".todo-text");

const unCheckedBtn = document.querySelector(".check-btn span:first-child");
const checkedBtn = document.querySelector(".check-btn span:last-child");

// EVENT LISTENER
document.addEventListener("DOMContentLoaded", getLocalTodos);
formPopupBtn.addEventListener("click", formPopupModel);
todoAddBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// document.addEventListener("click", checkElement);
// function checkElement(e) {
//   console.log(e.target);
// }

// FUNCTION

// Popup Form Open and Close
function formPopupModel() {
  formPopupBtn.classList.toggle("rotate_45");
  todoForm.classList.toggle("bottom-10");
}

function addTodo(e) {
  // Prevent form from submitting
  e.preventDefault();
  // console.log(e.preventDefault());

  // Checking the input value are Empty or nor

  if (todoInput.value == "") {
    alert("Please Enter Something");
  } else {
    // Create Todo Item Element Design Template

    // todo DIV
    const todoDiv = document.createElement("article");
    todoDiv.classList.add("todo-card");

    // Check Mark BUTTON Container
    const checkBtnContainer = document.createElement("div");
    checkBtnContainer.classList.add("check-btn");

    // __Uncheck Mark Button
    const unCheckBtn = document.createElement("span");
    unCheckBtn.classList.add("uncheck", "material-icons-round");
    unCheckBtn.innerHTML = "radio_button_unchecked";

    checkBtnContainer.appendChild(unCheckBtn);

    // __Check Mark Button
    const checkBtn = document.createElement("span");
    checkBtn.classList.add("check", "material-icons-round");
    checkBtn.innerHTML = "check_circle";
    checkBtn.style.display = "none";

    checkBtnContainer.appendChild(checkBtn);

    // Add Checked Container IN todo DIV
    todoDiv.appendChild(checkBtnContainer);

    // Create List
    const newTodoText = document.createElement("h2");
    newTodoText.innerHTML = todoInput.value;
    newTodoText.classList.add("todo-text");

    todoDiv.appendChild(newTodoText);

    // Delete Button
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("clear", "material-icons-round");
    deleteBtn.setAttribute = "delete-btnan";
    deleteBtn.innerText = "clear";

    todoDiv.appendChild(deleteBtn);

    // Append todoDiv in todoList
    todoList.appendChild(todoDiv);

    // Save Todos on Local Storage
    saveLocalTodos(todoInput.value);

    // Clear todo Input Value
    todoInput.value = "";
  }
}

// Todo Check Mark and Delete
function deleteCheck(e) {
  const item = e.target;
  console.log(item);

  // Delete Todo
  if (item.classList[0] === "clear") {
    const todo = item.parentElement;

    todo.classList.add("fall");

    // Delete todo item from Local Storage
    removeLocalTodos(todo);

    // Animation
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check Mark
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    todoText.classList.toggle("text-line-through");
    checkedBtn.classList.toggle("display-block");
  }
}

// unCheckedBtn.addEventListener("click", unChecked);
// checkedBtn.addEventListener("click", checked);

// // Unchecked Button
// function unChecked() {
//   unCheckedBtn.style.display = "none";
//   checkedBtn.style.display = "block";
// }
// // Checked Button
// function checked() {
//   checkedBtn.style.display = "none";
//   unCheckedBtn.style.display = "block";
// }

// www www www www STORE DATA ON LOCAL STORAGE www www www www

function saveLocalTodos(todo) {
  let todos;

  // Checking for Any prestored data on Local Storage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get todos from local storage

function getLocalTodos() {
  let todos;

  // Checking for Any prestored data on Local Storage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // Create Todo Item Element Design Template

    // todo DIV
    const todoDiv = document.createElement("article");
    todoDiv.classList.add("todo-card");

    // Check Mark BUTTON Container
    const checkBtnContainer = document.createElement("div");
    checkBtnContainer.classList.add("check-btn");

    // __Uncheck Mark Button
    const unCheckBtn = document.createElement("span");
    unCheckBtn.classList.add("uncheck", "material-icons-round");
    unCheckBtn.innerHTML = "radio_button_unchecked";

    checkBtnContainer.appendChild(unCheckBtn);

    // __Check Mark Button
    const checkBtn = document.createElement("span");
    checkBtn.classList.add("check", "material-icons-round");
    checkBtn.innerHTML = "check_circle";
    checkBtn.style.display = "none";

    checkBtnContainer.appendChild(checkBtn);

    // Add Checked Container IN todo DIV
    todoDiv.appendChild(checkBtnContainer);

    // Create List
    const newTodoText = document.createElement("h2");
    newTodoText.innerHTML = todo;
    newTodoText.classList.add("todo-text");

    todoDiv.appendChild(newTodoText);

    // Delete Button
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("clear", "material-icons-round");
    deleteBtn.setAttribute = "delete-btnan";
    deleteBtn.innerText = "clear";

    todoDiv.appendChild(deleteBtn);

    // Append todoDiv in todoList
    todoList.appendChild(todoDiv);
  });
}

// Remove Todos from local Storage
function removeLocalTodos(todo) {
  let todos;
  // console.log(todo);
  // Checking for Any prestored data on Local Storage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
