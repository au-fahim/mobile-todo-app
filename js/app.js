// SELECTOR
const formPopupBtn = document.querySelector(".form-popup-btn");
const todoForm = document.querySelector(".todo-form");

// Select item for todo Input
const todoInput = document.querySelector(".todo-input");
const todoAddBtn = document.querySelector(".todo-add-btn");
const todoList = document.querySelector(".todo-container");

// Select Categories CARDs
const categoryCardContainer = document.querySelector(
  ".categories-card-container"
);

// Select item for Alert Message
const bodyTag = document.querySelector("body");
const alertMsgBox = document.querySelector(".alert-msg");
const todoText = document.querySelector(".todo-text");

// Select item for Toggle Check Button
const unCheckedBtn = document.querySelector(".check-btn span:first-child");
const checkedBtn = document.querySelector(".check-btn span:last-child");

// Select item for Create Category
const categoryInput = document.querySelector(".catagory-select");
const categoryAddBtn = document.querySelector(".category-create-btn");
const categoryContainer = document.querySelector(".category-list");
const categoryList = document.querySelector(".category-list-container");

// EVENT LISTENER
document.addEventListener("DOMContentLoaded", () => {
  getLocalTodos();
  getLocalCategorys();

  let categoryItem = document.querySelectorAll("li.category");

  // Get Category item value
  categoryItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      categoryInput.value = e.currentTarget.innerHTML;
    });
  });

  // Show Cagegories in Category Card
});

formPopupBtn.addEventListener("click", formPopupModel);
todoAddBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// Category Container Stow & Hide Event
categoryInput.addEventListener("focus", (e) => {
  categoryContainer.style.visibility = "visible";
});
categoryInput.addEventListener("blur", (e) => {
  categoryContainer.style.visibility = "hidden";
});

// Events for Category Add
categoryAddBtn.addEventListener("click", categoryAdd);

// document.addEventListener("click", (e) => {
//   console.log(e.target);
// });

// FUNCTION

// Popup Form Open and Close
function formPopupModel() {
  formPopupBtn.classList.toggle("rotate_45");
  todoForm.classList.toggle("bottom-10");
}

// Alert Function
function alertMsg(alertText, removeMsg) {
  // Alert Div
  alertMsgBox.classList.add("active");

  // Alert Text come from paramiter
  alertMsgBox.innerHTML = alertText;

  if (removeMsg) {
    alertMsgBox.classList.remove("active");
    alertMsgBox.innerHTML = "";
  }
}

function addTodo(e) {
  // Prevent form from submitting
  e.preventDefault();

  // Checking the input value are Empty or nor

  if (todoInput.value == "") {
    // Alert Message
    alertMsg("Please Enter Something");
    setTimeout(() => {
      alertMsg("", "true");
    }, 4000);
  } else {
    alertMsg("", "true");

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
    deleteBtn.innerText = "clear";

    todoDiv.appendChild(deleteBtn);

    // Append todoDiv in todoList
    todoList.appendChild(todoDiv);

    // Save Todos on Local Storage
    saveLocalTodos(todoInput.value, categoryInput.value);
    // Clear todo Input Value
    todoInput.value = "";
    categoryInput.value = "";
  }
}

// Todo Check Mark and Delete
function deleteCheck(e) {
  const item = e.target;

  // Delete Todo
  if (item.classList[0] === "clear") {
    const todo = item.parentElement;

    todo.classList.add("fall");
    todo.remove();

    // Animation
    // todo.addEventListener("transitionend", function () {
    // });

    // Delete todo item from Local Storage
    removeLocalTodos(todo);
  }

  // Check Mark
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    // todoText.classList.toggle("text-line-through");
    // checkedBtn.classList.toggle("display-block");
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

// www www www www STORE Todo Item ON LOCAL STORAGE www www www www

function todosObj(todoText, todoCategory) {
  this.todoText = todoText;
  todoCategory == ""
    ? (this.categorys = "")
    : (this.todoCategory = todoCategory);
}

function saveLocalTodos(todo, category) {
  // Checking for Any prestored data on Local Storage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let categorys = JSON.parse(localStorage.getItem("categorys")) || [];

  let newTodos = new todosObj(todo, category);

  todos.push(newTodos);

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get todos from local storage

function getLocalTodos() {
  // Checking for Any prestored data on Local Storage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

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
    newTodoText.innerHTML = todo.todoText;
    newTodoText.classList.add("todo-text");

    todoDiv.appendChild(newTodoText);

    // Delete Button
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("clear", "material-icons-round");
    // deleteBtn.setAttribute = "delete-btnan";
    deleteBtn.innerText = "clear";

    todoDiv.appendChild(deleteBtn);

    // Append todoDiv in todoList
    todoList.appendChild(todoDiv);
  });
}

// Remove Todos from local Storage
function removeLocalTodos(todo) {
  // Checking for Any prestored data on Local Storage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ### ### ### ### ### CREATE CATEGORY ITEM ### ### ### ### ###

function categoryAdd(e) {
  // Prevent form from submitting
  e.preventDefault();

  if (categoryInput.value == "") {
  } else {
    // let categoryItem = `<li class='category'>${categoryInput.value}</li>`;

    // Create Category Item
    let categoryLi = document.createElement("li");
    categoryLi.classList.add("category");
    categoryLi.innerHTML = categoryInput.value;

    // Append the item to container
    categoryList.append(categoryLi);

    // Store Category Item in Local Storage
    saveCategoryLocal(categoryInput.value);

    // Reset the INPUT value
    categoryInput.value = "";
  }
}

// Save Category Item on Local Storage
function saveCategoryLocal(category) {
  // Check Any Data Alrady Have in Local Storage
  let categorys = JSON.parse(localStorage.getItem("categorys")) || [];

  categorys.push(category);

  localStorage.setItem("categorys", JSON.stringify(categorys));
}

function getLocalCategorys() {
  // Check Any Data Alrady Have in Local Storage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    // Create Category Item
    let categoryLi = document.createElement("li");
    categoryLi.classList.add("category");
    categoryLi.innerHTML = todo.todoCategory;

    // Append the item to container
    categoryList.append(categoryLi);
  });
  // Show on top Category Card
  let categoryCard = todos
    .map((item) => {
      return `
      <article class="categories-card">
        <h4 class="total-task">10 task</h4>
        <h2 class="categories-type">${item.todoCategory}</h2>
        <div class="progress-bar"></div>
      </article>`;
    })
    .join("");

  categoryCardContainer.innerHTML = categoryCard;
}
