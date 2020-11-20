function addNewTask(
  newID,
  newName,
  newDescription,
  newDate,
  newCreator,
  resolved,
  type,
  assignee,
  username
) {
  const userid = localStorage.getItem("id");

  // create new task item
  const newTask = document.createElement("li");
  newTask.setAttribute("class", "taskItem");
  newTask.setAttribute("id", newID);

  // create new task header
  const taskHeader = document.createElement("div");
  taskHeader.setAttribute("class", "taskHeader");

  const img2 = document.createElement("img");
  let src = "nonurgent.png";
  if (resolved !== null) {
    src = "done.png";
  } else if (type === 1) {
    src = "urgent.png";
  }
  img2.setAttribute("src", src);
  img2.setAttribute("style", "width:85px");

  const taskName = document.createElement("h3");
  taskName.setAttribute("class", "taskName");
  taskName.innerHTML = newName;

  const taskID = document.createElement("span");
  taskID.setAttribute("class", "taskID");
  taskID.innerHTML = "ID: " + newID;
  taskID.id = newID;

  taskHeader.appendChild(img2);
  taskHeader.appendChild(taskID);
  taskHeader.appendChild(taskName);
  newTask.appendChild(taskHeader);

  // create progressBar
  const pbar = document.createElement("div");
  pbar.setAttribute("class", "w3-light-grey w3-round");
  pbar.style.margin = "15px";

  const myBar = document.createElement("div");
  myBar.setAttribute("class", "");
  if (resolved !== null) {
    myBar.setAttribute("class", "myBar w3-container w3-round myBarDone");
    myBar.innerHTML = "DONE";
  } else {
    myBar.setAttribute("class", "myBar w3-container w3-round myBarInProgress");
    myBar.innerHTML = "InProgress..";
  }
  myBar.id = "myBar" + newID;

  pbar.appendChild(myBar);
  newTask.appendChild(pbar);

  //  create taskDescription
  const taskDesc = document.createElement("div");
  taskDesc.setAttribute("class", "taskDescription");
  taskDesc.innerHTML = newDescription;

  newTask.appendChild(taskDesc);

  const creator = document.createElement("div");
  creator.setAttribute("class", "creator");
  const creatorName = document.createElement("span");
  creatorName.innerHTML = "Created by: " + newCreator;

  creator.appendChild(creatorName);
  newTask.appendChild(creator);

  const time = document.createElement("div");
  time.setAttribute("class", "time");
  const date = document.createElement("span");
  date.innerHTML = newDate;

  const btnDone = document.createElement("button");
  btnDone.setAttribute("class", "w3-btn w3-round-xxlarge btnDone");
  btnDone.setAttribute("id", "btnDone" + newID);
  let innerHTML = "Show solution";
  if (resolved == null) {
    if (assignee != null) {
      if (assignee == userid) {
        innerHTML = "You are working on this task";
      } else {
        innerHTML = `Task is being worked on by ${username}`;
      }
    } else {
      innerHTML = "Add to my tasks";
      btnDone.addEventListener("click", appendToMyTasks);
    }
  } else {
    btnDone.addEventListener("click", showSolution);
  }
  btnDone.innerHTML = innerHTML;

  time.appendChild(date);
  time.appendChild(btnDone);
  newTask.appendChild(time);

  myTasksList.appendChild(newTask);

  return myTasksList;
}