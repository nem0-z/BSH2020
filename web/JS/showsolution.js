const tasktitle = document.getElementById("taskTitle");
const username = document.getElementById("username");
const comment = document.getElementById("comment");
const datesolved = document.getElementById("dateSolved");
const returnButton = document.getElementById("returnBtn");

window.onload = function () {
  var link = "http://localhost:3000/auth/showsolution";
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
        //  get last solution
        const len = data.data.length - 1;
        const solution = data.data[len];
        loadSolution(
          solution.idtask,
          solution.username,
          solution.comment,
          new Date(solution.date).toLocaleDateString()
        );
      } else {
        alert(data.message);
      }
    } else {
      alert("Server error");
    }
  };

  const idtask = localStorage.getItem("taskID");
  const data = {
    idtask,
  };
  xhr.send(JSON.stringify(data));
};

function loadSolution(idtask_, username_, comment_, date_) {
  const taskName = localStorage.getItem("taskName");

  tasktitle.innerHTML = taskName;
  username.innerHTML = username_;
  comment.innerHTML = comment_;
  datesolved.innerHTML = date_;
}

returnButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.history.back();
});
