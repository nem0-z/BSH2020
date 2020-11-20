var type = null;
const submitButton = document.getElementById("submitSolution");
const returnButton = document.getElementById("returnBtn");
const typeButton = document.getElementById("typeBtn");

const taskTitle = document.getElementById("taskTitle");
taskTitle.appendChild(document.createTextNode("Create new task"));

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  let urgent = document.getElementById("urgency").checked;

  const assignee = document.getElementById("assignee").value;
  const description = document.getElementById("comment").value;
  const iduser = localStorage.getItem("id");
  const data = {
    title: title,
    urgent: urgent ? 1 : 0,
    assignee: assignee,
    description: description,
    iduser: iduser,
    type: type,
  };

  sendHttpRequest("POST", "http://localhost:3000/auth/makenewtask", data)
    .then((responseData) => {
      window.location.assign("/teamtasks");
    })
    .catch((error) => alert(error));
});

returnButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.history.back();
});

function countChars(obj) {
  const maxLength = 1000;
  const strLength = obj.value.length;

  if (strLength > maxLength) {
    document.getElementById("charNum").innerHTML =
      '<span style="color: red;">' +
      strLength +
      " out of " +
      maxLength +
      " characters</span>";
  } else {
    document.getElementById("charNum").innerHTML = strLength + "/" + maxLength;
  }
}

function typeOfTask(event) {
  const value = event.innerHTML;
  if (value == "Feature") type = 1;
  else if (value == "Bug") type = 2;
  else if (value == "Report") type = 3;
  else if (value == "Support") type = 4;
  else type = 5;

  typeButton.innerHTML = value;
}
