function fetchReminders(){
const idUser = localStorage.getItem("id");
const data = { idUser: idUser };
sendHttpRequest("POST","http://localhost:3000/auth/calendarReminder",data)
.then(responseData=>{
    responseData.forEach((element)=>{
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
      })
      calendarMain(); 
      limitCalendarToWeek();
      adjustReminderSize();
}).catch(error => {
    alert(error);
});
}
