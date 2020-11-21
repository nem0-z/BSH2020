var id = localStorage.getItem("id");
var reminderList = document.getElementById("reminderList");
var submitButton = document.getElementById("submitButton");
var addReminderModal = document.getElementById("myModal");
var addReminderBtn = document.getElementById("addReminder");
var addRemSpan = document.getElementsByClassName("close")[0];
var remName = document.getElementById("remName");
var remDescription = document.getElementById("remDescription");
var remTime = document.getElementById("remTime");
var remIntervalTime = document.getElementById("remIntervalTime");
var buttonRepeating = document.getElementById("buttonRepeating");
var unusedElements = document.getElementById("unusedForEditingReminder");

//function for creating list item in reminder list
function createReminder(id, idreminder, type, name, description, date, active) {
  //type = 1 => onetime reminder
  //type = 0 => repeating reminder

  const reminder = document.createElement("li");
  reminder.setAttribute("class", "w3-bar");

  const editIcon = document.createElement("i");
  editIcon.setAttribute(
    "class",
    "fa fa-edit w3-bar-item w3-button w3-white w3-xlarge w3-right"
  );
  editIcon.addEventListener("click", function () {
    let dateToEdit = type ? date : "";
    openReminderModal(idreminder, name, description, dateToEdit);
  });
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
    dateSpan.dataset.timestamps = date;
  }
  reminder.appendChild(dateSpan);

  if (!type) {
    const slider = document.createElement("label");
    slider.setAttribute("class", "switch");

    const sliderInput = document.createElement("input");
    sliderInput.setAttribute("type", "checkbox");
    if (active) {
      sliderInput.setAttribute("checked", "checked");
    } else {
      dateSpan.classList.remove("repeating");
      dateSpan.textContent = "";
    }
    slider.appendChild(sliderInput);

    const sliderSpan = document.createElement("span");
    sliderSpan.setAttribute("class", "slider round");
    slider.appendChild(sliderSpan);

    reminder.appendChild(slider);

    sliderInput.addEventListener("click", function () {
      let data = {
        idrepeating: id,
      };
      if (sliderInput.checked) {
        //enable repeating
        if (!dateSpan.classList.contains("repeating")) {
          dateSpan.classList.add("repeating");
          data.active = 1;
        }
      } else {
        //disable repeating
        if (dateSpan.classList.contains("repeating")) {
          dateSpan.classList.remove("repeating");
          dateSpan.textContent = "";
          data.active = 0;
        }
      }
      sendHttpRequest(
        "PUT",
        "http://localhost:3000/auth/changeReminderActivity",
        data
      );
    });
  }

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
      alert(name);
      reminderList.removeChild(element.parentNode);
    }
  }
  let repeatings = document.getElementsByClassName("repeating");
  for (const element of repeatings) {
    let timestamps = Array.from(element.dataset.timestamps.split(","), (x) =>
      parseInt(x)
    );
    let now = new Date().getTime();
    let last = timestamps.length - 1;
    while (timestamps[last] < now) {
      timestamps.pop();
      last--;
      element.dataset.timestamps = timestamps;
    }
    let text = updateTime(timestamps[last]);
    if (text != "0s") {
      element.textContent = text;
    } else {
      let name = element.parentNode.getElementsByClassName("name")[0]
        .textContent;
      let description = element.parentNode.getElementsByClassName(
        "description"
      )[0].textContent;
      alert(name);

      if (timestamps.lenght == 1) reminderList.removeChild(element.parentNode);
    }
  }
}

function openReminderModal(idreminder, name, description, dateToEdit) {
  //show modal
  addReminderModal.style.display = "block";

  if (idreminder) {
    //edit

    //hide unused elements
    unusedElements.style.display = "none";
    submitButton.textContent = "SAVE";

    //fill inputs with existing data
    remName.value = name;
    remDescription.value = description;

    submitButton.onclick = function () {
      let data = fetchData(idreminder);
      console.log(data);
      sendHttpRequest("PUT", "http://localhost:3000/auth/editReminder", data)
        .then((responseData) => {
          location.reload();
        })
        .catch((error) => {
          alert(error);
        });
    };
  } else {
    //add
    submitButton.textContent = "ADD";
    unusedElements.style.display = "block";
    remIntervalTime.disabled = true;
    buttonRepeating.checked = false;

    submitButton.onclick = function () {
      let data = fetchData();
      sendHttpRequest("POST", "http://localhost:3000/auth/addReminder", data)
        .then((responseData) => {
          location.reload();
        })
        .catch((error) => {
          alert(error);
        });
    };
  }
}

function fetchData(idreminder) {
  let txt_name = remName.value;
  let txt_description = remDescription.value;
  var txt_time = document.getElementById("remTime").value;

  // puno if-ova nekih da vidim jel sve sto treba bit tu
  if (!idreminder) {
    if (!txt_time) {
      alert("Wrong input!\nTime is required!");
      return "";
    }
    else if (buttonRepeating.checked == true && !remIntervalTime.value) {
      alert("Time interval is required for repeating reminders!");
      return ""
    }
  }
  if (!txt_name || !txt_description) {
    alert("Wrong input!\nName and description are required!");
    return "";
  }
  let data = {
    name: txt_name,
    description: txt_description
  };

  if (idreminder) {
    data.idreminder = idreminder;
  } else {
    let txt_time = remTime.value;
    const remDate = new Date(new Date(txt_time).getTime() + 3600 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    data.dateBegin = remDate;
    let txt_interval = remIntervalTime.value;
    data.time = txt_interval;
    data.creator = id;
    data.type = !buttonRepeating.checked;
  }

  return data;
}

addReminderBtn.onclick = function () {
  openReminderModal();
};

addRemSpan.onclick = function () {
  addReminderModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == addReminderModal) {
    addReminderModal.style.display = "none";
  }
};

buttonRepeating.addEventListener("click", function () {
  console.log(buttonRepeating.checked);
  if (buttonRepeating.checked) {
    remIntervalTime.disabled = false;
  } else {
    remIntervalTime.disabled = true;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  sendHttpRequest(
    "GET",
    "http://localhost:3000/auth/getRepeatingReminders?creator=" + id
  )
    .then((responseData) => {
      responseData.forEach((element) => {
        let timeBegin = new Date(element.dateBegin).getTime();
        let now = new Date().getTime();
        while (timeBegin < now) {
          timeBegin += element.time * 60000;
        }
        let timestamps = new Array();
        let endTime = timeBegin + 43200000;
        while (timeBegin < endTime) {
          timestamps.push(timeBegin);
          timeBegin += element.time * 60000;
        }
        timestamps.reverse();

        let active =
          new Date(element.dateBegin) < new Date() ? element.active : 0;

        const reminder = createReminder(
          element.idrepeating,
          element.idreminder,
          0,
          element.name,
          element.description,
          timestamps,
          active
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
