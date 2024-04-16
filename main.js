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

function dateDiff(d) { //? la "d" dentro del dateDiff hace referencia a los datos que pondremos, por ejemplo: dateDiff(eventDate.value) < 0, en este caso la "d" sería "eventDate.value".  
  //? Esta funcion regresa el numero de dias que faltan de la fecha actual a la fecha destino 
  //! Si el valor es negativo entonces no creara el evento(añadirlo a la lista).
  const targetDate = new Date(d);
  const dateNow = new Date();
  const difference = targetDate.getTime() - dateNow.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;

}

