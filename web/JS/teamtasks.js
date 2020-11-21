window.onload = () => {
  const userRole = localStorage.getItem("role");
  sendHttpRequest("POST", "http://localhost:3000/auth/teamtasks")
    .then((taskList) => {
      //Show each task on html if query went through
      taskList.forEach((task) => {
        addNewTask(
          task.idtask,
          task.name,
          task.description,
          new Date(task.dateCreated).toLocaleDateString(),
          task.creatorName,
          task.resolved,
          task.urgency,
          task.assignee,
          task.username,
          task.type
        );
      });
      // if (userRole == 2) {
      //   const leaderBtn = document.getElementById("leaderAddBtn");
      //   leaderBtn.style.display = "block";
      //   leaderBtn.addEventListener("click", makeNewTask);
      // } //This not good, deal with this later
    })
    .catch((error) => alert(error));
};

function showSolution(event) {
  const btnDone = event.target;
  const taskItem = btnDone.parentElement.parentElement;
  const taskID = taskItem.id;
  const taskName = taskItem.children[0].children[2].textContent;
  localStorage.setItem("taskName", taskName);
  localStorage.setItem("taskID", taskID);
  window.location.assign("/showsolution");
}

function appendToMyTasks(event) {
  const btnDone = event.target;
  const taskItem = btnDone.parentElement.parentElement;
  const taskID = taskItem.id;
  const iduser = localStorage.getItem("id");

  const data = {
    taskID: taskID,
    iduser: iduser,
  };

  sendHttpRequest("POST", "http://localhost:3000/auth/appendmytask", data)
    .then((responseData) => {
      location.reload();
    })
    .catch((error) => {
      alert(error);
    });
}

function makeNewTask(event) {
  window.location.assign("/makenewtask");
}
