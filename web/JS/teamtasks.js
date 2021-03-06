const modal = document.getElementById("myModal");
const submitBtn = document.getElementById("submitBtn");
const returnBtn = document.getElementById("returnBtn");
const date = document.getElementById("date");
const timebegin = document.getElementById("timebegin");
const timeend = document.getElementById("timeend");
const subheader = document.getElementById("subheader");
var idtask;

window.onload = () => {
  const body = document.getElementsByTagName("body")[0];
  body.style.backgroundImage = "url('../wallpaper1.jpg')";
  const userRole = localStorage.getItem("role");
  sendHttpRequest("GET", "http://localhost:3000/auth/teamtasks")
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
  modal.style.display = "block";
  idtask = event.target.id.substring(7);

  const iduser = localStorage.getItem("id");

  const data = {
    taskID: idtask,
    iduser: iduser,
  };

  sendHttpRequest(
    "POST",
    "http://localhost:3000/auth/appendmytask",
    data
  ).catch((error) => {
    alert(error);
  });
}

function makeNewTask(event) {
  window.location.assign("/makenewtask");
}

returnBtn.addEventListener("click", () => {
  modal.style.display = "none";
  location.reload();
});

// create date, begin and end time then send http request
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const eventdate = date.value;
  const eventbegin = timebegin.value;
  const eventend = timeend.value;

  if (eventdate === "" || eventbegin === "" || eventend === "") {
    alert("Empty fields!");
  } else {
    const data = {
      eventdate: eventdate,
      eventbegin: eventbegin,
      eventend: eventend,
      idtask: idtask,
    };
    sendHttpRequest(
      "POST",
      "http://localhost:3000/auth/addtasktocalendar",
      data
    )
      .then((responseData) => {
        modal.style.display = "none";
        location.reload();
      })
      .catch((error) => alert(error));
  }
});
