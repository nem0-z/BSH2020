const idUser = localStorage.getItem("id");
sendHttpRequest("GET","http://localhost:3000/auth/calendar?idUser=" + idUser)
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
      fetchReminders();
}).catch(error => {
    alert(error);
});

