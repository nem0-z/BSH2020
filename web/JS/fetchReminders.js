function fetchReminders() {
  const idUser = localStorage.getItem("id");

  sendHttpRequest(
    "GET",
    "http://localhost:3000/auth/calendarReminder?idUser=" + idUser
  )
    .then((responseData) => {
      responseData.forEach((element) => {
        addCalendarEvent(
          element.name,
          element.description,
          element.satPocetak,
          element.satKraj,
          element.minPocetak,
          element.minKraj,
          element.day,
          element.urgency
        );
      });
      calendarMain();
      limitCalendarToWeek();
    })
    .catch((error) => {
      alert(error);
    });
}
