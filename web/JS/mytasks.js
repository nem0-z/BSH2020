window.onload = function () {
  var link = "http://localhost:3000/auth/mytasks";
  var xhr = new XMLHttpRequest();

  xhr.open("POST", link, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onerror = function () {
    alert("Network error");
  };

  xhr.onload = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      var data = JSON.parse(this.response);
      if (data.status == 200) {
        let taskList = data.data;
        localStorage.setItem("tList", JSON.stringify(taskList));
        taskList.forEach((task) => {
          addNewTask(
            task.idtask,
            task.name,
            task.description,
            new Date(task.dateCreated).toLocaleDateString(),
            task.taskCreator,
            task.resolved,
            task.type
          );
        });
      } else {
        alert(data.message);
      }
    } else {
      alert("Server error");
    }
  };

  const iduser = localStorage.getItem("id");
  const data = {
    iduser,
  };
  xhr.send(JSON.stringify(data));
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
