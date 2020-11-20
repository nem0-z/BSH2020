var inputUsername = document.getElementById("inputUsername");
var inputPassword = document.getElementById("inputPassword");
var submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  let username = inputUsername.value;
  let password = inputPassword.value;

  if (username != "" && password != "") {
    var data = {
      name: username,
      password: password,
    };

    var json = JSON.stringify(data);
    var link = "http://localhost:3000/auth/login";
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
          localStorage.setItem("id", data.data.iduser);
          localStorage.setItem("username", data.data.username);
          localStorage.setItem("role", data.data.role);

          window.location.assign("/home");
        } else {
          alert(data.message);
        }
      } else {
        alert("Server error");
      }
    };

    xhr.send(json);
  } else {
    alert("Please fill out all fields!");
  }
});
