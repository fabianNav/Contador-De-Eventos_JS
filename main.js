import './css/style.css'

let events = [];
let arr = []; //? Sirve para cargar informacion y asignarla a eventos.

const eventName = document.getElementById('eventName');
const eventDate = document.getElementById('eventDate');
const buttonAdd = document.getElementById('bAdd');
const eventsContainer = document.getElementById('eventsContainer');

document.getElementById('formEvents').addEventListener('submit', (e) => {
  e.preventDefault();
  addEvent();
})

function addEvent() {     //? Esta funcion hace que todas las funciones se junten y de ahí se van al evento principal.
  if(eventName.value === "" || eventDate.value === "") {
    return;
  } else if (dateDiff(eventDate.value) < 0) {
    return;
  } 

  const newEvent = {
    id: (Math.random() * 200).toString(36).slice(3),
    name: eventName.value,
    date: eventDate.value
  };

  events.unshift(newEvent);

  eventName.value = "";

  renderEvents();
}
