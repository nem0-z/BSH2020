function limitCalendarToWeek()
{
    //const ul = document.getElementById(day);
    var today = new Date();
    var day = today.getDay() || 7; 
    if( day !== 1 )                
        today.setHours(-24 * (day - 1));   
    const days = ["spanMonday","spanTuesday","spanWednesday","spanThursday","spanFriday"];            
    for(let i = 0; i<5 ;++i,today.setDate(today.getDate()+1))                       
    document.getElementById(days[i]).innerHTML+="<br>"+today.getDate()+"."+today.getMonth()+"."+today.getFullYear();
}