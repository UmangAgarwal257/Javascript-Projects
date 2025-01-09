let todos = [];

document.querySelector("input").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTodo();
  }
});

function addTodo() {
  todos.push({
    title: document.querySelector("input").value,
  });
  render();
}
function editTodoAt(index) {
  todos[index].isEditing = true;
  render();
}

function deleteLastTodo() {
  todos.pop();
  render();
}

function deleteFirstTodo() {
  todos.splice(0, 1);
  render();
}

function deleteTodoAt(index) {
  todos.splice(index, 1);
  render();
}

function createTodoComponent(todo, index) {
  const divEle = document.createElement("div");
  const spanEle = document.createElement("span");
  const delButton = document.createElement("button");
  const editButton = document.createElement("button");
  const itemEle = document.createElement("h4");
  const parentEl = document.getElementById("todos");

  delButton.innerHTML = "Delete";
  editButton.innerHTML = "Edit";
  delButton.setAttribute("onclick", "deleteTodoAt(" + index + ")");
  editButton.setAttribute("onclick", "editTodoAt(" + index + ")");
  if (todo.isEditing) {
    itemEle.innerHTML = "";
    const inputElement = document.createElement("input");
    inputElement.value = todo.title;
    divEle.appendChild(inputElement);

    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.onclick = () => {
      if (inputElement.value.trim() !== "") {
        todos[index].title = inputElement.value.trim();
        todos[index].isEditing = false;
        render();
      }
    };
    divEle.appendChild(saveButton);
  } else {
    itemEle.innerHTML = `${index + 1}. ${todo.title}`;
    divEle.appendChild(spanEle);
    divEle.appendChild(editButton);
    divEle.appendChild(delButton);
    spanEle.appendChild(itemEle);
  }
  parentEl.appendChild(divEle);
  return divEle;
}

function render() {
  document.querySelector("#todos").innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = createTodoComponent(todos[i], i);
    document.querySelector("#todos").appendChild(todo);
  }
}
