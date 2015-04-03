var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//new Task list item
var createNewTaskElement = function(taskString) {
  //create list item
  var listItem = document.createElement("li");
  //append these children to listItem
  //input (checkbox)
  var checkBox = document.createElement("input");

  var label = document.createElement("label");

  var editInput = document.createElement("input");

  var editButton = document.createElement("button");

  var deleteButton = document.createElement("button");


  //each element needs modifying

  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  //each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

//add a new task
var addTask = function() {
  console.log("add task...");

  //prevent the creation of empty task items
  if (taskInput.value === "") {
    taskInput.value = "its empty, try again";

  } else {
    var listItem = createNewTaskElement(taskInput.value);


    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  }


};

//Edit an existing Task

var editTask = function() {
  console.log("edit task");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var editButton = listItem.querySelector("button");


  console.log("listitem and editbutton", listItem, editButton);
  var containsClass = listItem.classList.contains("editMode");

  console.log("Is this the edit button", editButton);
  if (containsClass) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";

  }

  listItem.classList.toggle("editMode");

};

//delete an existing task
var deleteTask = function() {
  console.log("delete task");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);

};

//mark task as incomplete
var taskCompleted = function() {
  console.log("task completed");

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
  console.log("Task Incomplete");
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind task events");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

//variables, functions, wiring at the bottom
var ajaxRequest = function() {
  console.log("ajaxrequest the server here");
};

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompletaskholder ul items
for (var i = 0; i < incompleteTasksHolder.children.length; i += 1) {
  //for each list item
  //bind events to list items children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}



//for each list item
for (var i = 0; i < completedTasksHolder.children.length; i += 1) {
  //bind events to list items children (taskincomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


   
