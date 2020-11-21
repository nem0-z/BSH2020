var id = localStorage.getItem("id");
var reminderList = document.getElementById("reminderList");

//function for creating list item in reminder list
function createReminder(id, idreminder, type, name, description, date) {
  //type = 1 => onetime reminder
  //type = 0 => repeating reminder

  const reminder = document.createElement("li");
  reminder.setAttribute("class", "w3-bar");

  const editIcon = document.createElement("i");
  editIcon.setAttribute(
    "class",
    "fa fa-edit w3-bar-item w3-button w3-white w3-xlarge w3-right"
  );
  reminder.appendChild(editIcon);

  const img = document.createElement("img");
  img.setAttribute("class", "w3-bar-item w3-circle w3-hide-small");
  img.style.width = "85px";
  if (type) {
    //onetime reminder
    img.setAttribute("src", "../clock.png");
  } else {
    //repeating reminder
    img.setAttribute("src", "../repeat.png");
  }
  reminder.appendChild(img);

  const textDiv = document.createElement("div");
  textDiv.setAttribute("class", "text w3-bar-item");

  const titleSpan = document.createElement("span");
  titleSpan.setAttribute("class", "name w3-large");
  titleSpan.textContent = name;
  textDiv.appendChild(titleSpan);

  const br = document.createElement("br");
  textDiv.appendChild(br);

  const descriptionSpan = document.createElement("span");
  descriptionSpan.setAttribute("class", "description");
  descriptionSpan.textContent = description;
  textDiv.appendChild(descriptionSpan);

  reminder.appendChild(textDiv);

  const dateSpan = document.createElement("span");
  dateSpan.setAttribute("class", "time w3-bar-item w3-right w3-large");
  if (type) {
    dateSpan.classList.add("onetime");
    dateSpan.setAttribute("data-date", new Date(date));
  } else {
    dateSpan.classList.add("repeating");
  }
  reminder.appendChild(dateSpan);

  return reminder;
}
function updateTime(date) {
  //function for calculating time left
  let now = new Date().getTime();
  let distance = date - now;

  if (distance <= 0) {
    return "";
  }

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  let text = "";
  if (days) text += days + "d " + hours + "h " + minutes + "m ";
  else {
    if (hours) text += hours + "h " + minutes + "m ";
    else {
      if (minutes) text += minutes + "m ";
    }
  }
  text += seconds + "s";

  return text;
}

function setAllTimers() {
  let onetimes = document.getElementsByClassName("onetime");
  for (const element of onetimes) {
    let time = new Date(element.dataset.date).getTime();
    let text = updateTime(time);
    if (text != "") {
      element.textContent = text;
    } else {
      let name = element.parentNode.getElementsByClassName("name")[0]
        .textContent;
      let description = element.parentNode.getElementsByClassName(
        "description"
      )[0].textContent;
      openModalReminder(name, description);

      reminderList.removeChild(element.parentNode);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  sendHttpRequest(
    "GET",
    "http://localhost:3000/auth/getRepeatingReminders?creator=" + id
  )
    .then((responseData) => {
      responseData.forEach((element) => {
        const reminder = createReminder(
          element.idrepeating,
          element.idreminder,
          0,
          element.name,
          element.description,
          element.dateBegin
        );
        reminderList.appendChild(reminder);
      });
    })
    .catch((error) => alert(error));

  sendHttpRequest(
    "GET",
    "http://localhost:3000/auth/getOnetimeReminders?creator=" + id
  )
    .then((responseData) => {
      responseData.forEach((element) => {
        //show reminders that are not expired
        if (new Date(element.dateBegin) > new Date()) {
          const reminder = createReminder(
            element.idonetime,
            element.idreminder,
            1,
            element.name,
            element.description,
            element.dateBegin
          );
          reminderList.appendChild(reminder);
        }
      });
    })
    .catch((error) => alert(error));
});

var intervalFunction = window.setInterval(setAllTimers, 1000);