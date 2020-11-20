const inputUsername = document.getElementById("username");
inputUsername.value = localStorage.getItem("username");
const commit = document.getElementById("commitLink");
const comment = document.getElementById("comment");
const submitButton = document.getElementById("submitSolution");
const returnButton = document.getElementById("returnBtn");

const taskList = JSON.parse(localStorage.getItem("tList"));
const idtask = localStorage.getItem("taskID");

const taskName = localStorage.getItem("taskName");
const taskTitle = document.getElementById("taskTitle");
taskTitle.appendChild(document.createTextNode(taskName));

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputUsername.value;
  const commitURL = commitLink.value;
  const userComment = comment.value;

  if (username === "") {
    alert("Idk who you are");
  } else if (commitURL === "" && userComment === "") {
    alert("I need either your comment or a commit url");
  } else {
    let comment = "";

    if (commitURL === "") {
      comment = userComment;
    } else if (userComment === "") {
      comment = commitURL;
    } else {
      comment =
        "Commit URL: " + commitURL + "\n" + "User comment: " + userComment;
    }
    const data = {
      comment: comment,
      idtask: idtask,
    };
    const link = "http://localhost:3000/auth/solution";
    const xhr = new XMLHttpRequest();

    xhr.open("POST", link, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onerror = function () {
      alert("Network error");
    };

    xhr.onload = function () {
      if (xhr.status == 200 && xhr.readyState == 4) {
        var data = JSON.parse(this.response);
        if (data.status == 200) {
          window.location.assign("/mytasks");
        } else {
          alert(data.message);
        }
      } else {
        alert("Server error");
      }
    };
    xhr.send(JSON.stringify(data));
  }
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
