var modal = document.getElementById("myModal");

window.onload = () => {
  const userRole = localStorage.getItem("role");
  sendHttpRequest("POST", "http://localhost:3000/auth/teamtasks")
    .then((taskList) => {
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
      if (userRole == 2) {
        const leaderBtn = document.getElementById("leaderAddBtn");
        leaderBtn.style.display = "block";
        leaderBtn.addEventListener("click", makeNewTask);
      }
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
  showModal(event);

  // const btnDone = event.target;
  // const taskItem = btnDone.parentElement.parentElement;
  // const taskID = taskItem.id;
  // const iduser = localStorage.getItem("id");

  // const data = {
  //   taskID: taskID,
  //   iduser: iduser,
  // };

  // const link = "http://localhost:3000/auth/appendmytask";
  // const xhr = new XMLHttpRequest();

  // xhr.open("POST", link, true);
  // xhr.setRequestHeader("Content-Type", "application/json");

  // xhr.onerror = function () {
  //   alert("Network error");
  // };

  // xhr.onload = function () {
  //   if (xhr.status == 200 && xhr.readyState == 4) {
  //     const data = JSON.parse(this.response);
  //     if (data.status == 200) {
  //       location.reload();
  //     } else {
  //       alert(data.message);
  //     }
  //   } else {
  //     alert("Server error");
  //   }
  // };
  // xhr.send(JSON.stringify(data));
}

function makeNewTask(event) {
  window.location.assign("/makenewtask");
}

function showModal(event) {
  modal.style.display = "block";
}
