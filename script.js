let todoItems = [];

function renderTodo(todo) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));

  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if(todo.deleted){
    item.remove();
    if (todoItems.length === 0) list.innerHTML = "";
    return;
  }

const isChecked = todo.checked ? "done" : "";
const listItemElement = document.createElement("li");
listItemElement.setAttribute("class", `todo-item ${isChecked}`);
listItemElement.setAttribute("data-key", todo.id);
listItemElement.innerHTML = `
  <input id="${todo.id}" type="checkbox"/>
  <label for="${todo.id}" class = "tick js-tick"></label>
  <span>${todo.text}</span>
  <button class="delete-todo js-delete-todo">
  &times;
  </button>
  `;

  if (item) {
    list.replaceChild(listItemElement, item);
  } else {
    list.append(listItemElement);
  }
}

//let todoItems = [];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
  //console.log(todoItems);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

function toggleDone(key){
  const index = todoItems.findIndex((item) = item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key){
  const index = todoItems.findIndex((item) => item.id === Number(key));
  const todo = {
    delete: true,
     ...todoItems[index],
  };
  

 todoItems = todoItems.filter((item) => item.id !== Number(key));
 renderTodo(todo);
}

const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

   if (event.target.classList.contains("js-delete-todo")){
     const itemkey = event.target.parentElement.dataset.key;
     deleteTodo(itemKey);
   }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const ref = localStorage.getItem("todoItems");
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach((t) => {
        renderTodo(t);
      });
    }
  });