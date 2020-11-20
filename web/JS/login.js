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

    sendHttpRequest("POST", "http://localhost:3000/auth/login", data)
      .then(responseData => {
        localStorage.setItem("id", responseData.iduser);
        localStorage.setItem("username", responseData.username);
        localStorage.setItem("role", responseData.role);

        window.location.assign("/home");
      }).catch(error => alert(error));


  } else {
    alert("Please fill out all fields!");
  }
});
