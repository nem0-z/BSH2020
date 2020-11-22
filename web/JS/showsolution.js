const tasktitle = document.getElementById("taskTitle");
const username = document.getElementById("username");
const comment = document.getElementById("comment");
const datesolved = document.getElementById("dateSolved");
const returnButton = document.getElementById("returnBtn");

//Execute on page open
window.onload = function () {
  const idtask = localStorage.getItem("taskID");
  sendHttpRequest("GET", "http://localhost:3000/auth/showsolution?idtask=" + idtask)
    .then((responseData) => {
      //If all good then show solution in another html
      const len = responseData.length - 1;
      const solution = responseData[len];
      loadSolution(
        solution.username,
        solution.comment,
        new Date(solution.date).toLocaleDateString()
      );
    })
    .catch((error) => alert(error));
};

function loadSolution(username_, comment_, date_) {
  const taskName = localStorage.getItem("taskName");

  //Set properties of solution specific fields
  tasktitle.innerHTML = taskName;
  username.innerHTML = username_;
  comment.innerHTML = comment_;
  datesolved.innerHTML = date_;
}

returnButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.history.back();
});
