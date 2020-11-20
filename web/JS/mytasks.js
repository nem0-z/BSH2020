window.onload = function () {
  const iduser = localStorage.getItem("id");
  const data = {
    iduser,
  };
  sendHttpRequest("POST", "http://localhost:3000/auth/mytasks", data)
    .then(taskList => {
      localStorage.setItem("tList", JSON.stringify(taskList));
      taskList.forEach((task) => {
        addNewTask(
          task.idtask,
          task.name,
          task.description,
          new Date(task.dateCreated).toLocaleDateString(),
          task.taskCreator,
          task.resolved,
          task.urgency
        );
      });
    })
    .catch(error => alert(error));
};

var myTasksList = document.getElementById("myTasksList");

function addSolution(event) {
  const btnDone = event.target;
  const taskItem = btnDone.parentElement.parentElement;
  const taskID = taskItem.id;
  const taskName = taskItem.children[0].children[2].textContent;
  localStorage.setItem("taskName", taskName);
  localStorage.setItem("taskID", taskID);
  window.location.assign("/solution");
}

function showSolution(event) {
  const btnDone = event.target;
  const taskItem = btnDone.parentElement.parentElement;
  const taskID = taskItem.id;
  const taskName = taskItem.children[0].children[2].textContent;
  localStorage.setItem("taskName", taskName);
  localStorage.setItem("taskID", taskID);
  window.location.assign("/showsolution");
}
