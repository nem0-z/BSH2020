function addCalendarEvent(
  name,
  description,
  timeBeginh,
  timeEndh,
  timeBeginm,
  timeEndm,
  day
) {
  const ul = document.getElementById(day);
  const li = document.createElement("li");
  const a = document.createElement("a");
  const em = document.createElement("em");

  li.setAttribute("class", "cd-schedule__event");

  a.setAttribute("data-start", timeBeginh + ":" + timeBeginm);
  a.setAttribute("data-end", timeEndh + ":" + timeEndm);
  a.setAttribute("data-content", "event-yoga-1");
  a.setAttribute("data-event", "event-3");
  a.setAttribute("href", "#0");

  em.setAttribute("class", "cd-schedule__name");
  em.innerHTML = name;

  a.appendChild(em);
  li.appendChild(a);
  ul.appendChild(li);
  return ul;
}
