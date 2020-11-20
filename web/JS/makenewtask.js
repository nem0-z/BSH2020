const submitButton = document.getElementById("submitSolution");
const returnButton = document.getElementById("returnBtn");

const taskTitle = document.getElementById("taskTitle");
taskTitle.appendChild(document.createTextNode("Create new task"));

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const urgent = document.getElementById("urgency").value; //make this a checkbox, it's a boolean
  const assignee = document.getElementById("assignee").value;
  const description = document.getElementById("comment").value;
  const iduser = localStorage.getItem("id");
  const type = 2;

  const data = {
    title: title,
    urgent: urgent,
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
