const modal = document.getElementById("myModal");
//Execute on page open
window.onload = function () {
  const iduser = localStorage.getItem("id");
  sendHttpRequest("GET", "http://localhost:3000/auth/mytasks?iduser=" + iduser)
    .then((taskList) => {
      //If all good, show each task on html and save data in localStorage
      //We do this to avoid another query later on -> taskList will be cleared accordingly from localStorage
      localStorage.setItem("tList", JSON.stringify(taskList));
      taskList.forEach((task) => {
        addNewTask(
          task.idtask,
          task.name,
          task.description,
          new Date(task.dateCreated).toLocaleDateString(),
          task.taskCreator,
          task.resolved,
          task.urgency,
          task.type
        );
      });
    })
    .catch((error) => alert(error));
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

function addToCalendar(event) {
  event.preventDefault();
  const addToCalBtn = event.target;
  const taskItem = addToCalBtn.parentElement.parentElement;
  const taskID = taskItem.id;
  localStorage.setItem("taskID", taskID);

  const data = {
    idtask: taskID,
  };

  sendHttpRequest(
    "POST",
    "http://localhost:3000/auth/checktaskincalendar",
    data
  )
    .then((responseData) => {
      console.log(responseData);
      if (responseData === undefined) {
        modal.style.display = "block";
      } else {
        alert("Task is already in calendar.");
      }
    })
    .catch((error) => alert(error));
}

const submitBtn = document.getElementById("submitBtn");
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
      idtask: localStorage.getItem("taskID"),
    };
    sendHttpRequest(
      "POST",
      "http://localhost:3000/auth/addtasktocalendar",
      data
    )
      .then((responseData) => {
        console.log(responseData);
        modal.style.display = "none";
        // location.reload();
      })
      .catch((error) => alert(error));
  }
});

const returnBtn = document.getElementById("returnBtn");
returnBtn.addEventListener("click", () => {
  modal.style.display = "none";
  location.reload();
});
