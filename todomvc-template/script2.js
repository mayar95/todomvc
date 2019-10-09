const todoInput = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
const footerbar = document.querySelector("footer.footer");
const clearAll = document.querySelector(".clear-completed");
const toggleAll = document.querySelector(".toggle-all");

todoInput.addEventListener("keyup", function(event) {
  const newtodotext = todoInput.value.trim();
  if (event.keyCode == 13) {
    todoInput.value = "";
    newTodoList(newtodotext);
  }
});

function newTodoList(text) {
  const newTodoListEL = document.createElement("li");
  newTodoListEL.innerHTML = `
        <div class= "view">
                <input class ="toggle" type = "checkbox" />
                    <label>${text}</label>
                <button class ="destroy"></button>

            </div>
                <input class = "edit" value = ${text}/>
  `;
  //Adding New Elements in the todo list.
  todoList.appendChild(newTodoListEL);

  //if user wants to delete a note
  const destroyBtn = newTodoListEL.querySelector("button.destroy");
  destroyBtn.addEventListener("click", closeTodo);

  //Toggle an element
  const toggleEl = newTodoListEL.querySelector(".toggle");
  toggleEl.addEventListener("click", togglecheckbox);

  //Clear all items in the list
  clearAll.addEventListener("click", clearAllItems);

  //Toggle all items in the list
  toggleAll.addEventListener("click", toggleAllInput);

  toggleFooterBar();
}

function toggleFooterBar() {
  if (todoList.children.length) {
    footerbar.style.display = "block";
  } else {
    footerbar.style.display = "none";
  }
}

function closeTodo(event) {
  event.target.parentNode.parentNode.remove();
  toggleFooterBar();
}

function togglecheckbox(event) {
  if (event.target.checked) {
    event.target.parentNode.parentNode.classList.add("completed");
  } else {
    event.target.parentNode.parentNode.classList.remove("completed");
  }
  toggleFooterBar();
}

function clearAllItems(event) {
  const items = Array.from(todoList.children);
  items.forEach(item => {
    if (item.classList.contains("completed")) {
      item.remove();
    }
  });
  toggleFooterBar();
}

function toggleAllInput(event) {
  const items = Array.from(todoList.children);
  items.forEach(item => {
    if (!item.classList.contains("completed") && event.target.checked) {
      item.classList.add("completed");
      document
        .querySelector('.completed input[type="checkbox"]')
        .setAttribute("checked", true);
    } else {
      item.classList.remove("completed");
      document
        .querySelector('.view input[type="checkbox"]')
        .removeAttribute("checked");
    }
  });
}

toggleFooterBar();
