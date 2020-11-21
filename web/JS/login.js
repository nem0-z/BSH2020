const inputUsername = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  //Parse user input
  let username = inputUsername.value;
  let password = inputPassword.value;

  if (username != "" && password != "") {
    var data = {
      name: username,
      password: password,
    };

    //Send http request and if all good -> go to homepage
    sendHttpRequest("POST", "http://localhost:3000/auth/login", data)
      .then((responseData) => {
        localStorage.setItem("id", responseData.iduser);
        localStorage.setItem("username", responseData.username);
        localStorage.setItem("role", responseData.role);

        window.location.assign("/home");
      })
      .catch((error) => alert(error));
  } else {
    alert("Please fill out all fields!");
  }
});
