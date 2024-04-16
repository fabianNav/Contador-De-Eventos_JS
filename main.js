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

  events.unshift(newEvent);  //? Agrega los datos ingresados en forma de objeto a la lista "events".

  eventName.value = "";

  renderEvents();
}

function dateDiff(d) { //? la "d" dentro del dateDiff hace referencia a los datos que pondremos, por ejemplo: dateDiff(eventDate.value) < 0, en este caso la "d" sería "eventDate.value".  
  //? Esta funcion regresa el numero de dias que faltan de la fecha actual a la fecha destino 
  //! Si el valor es negativo entonces no creara el evento(añadirlo a la lista).
  const targetDate = new Date(d); //? Fecha objetivo (fecha del evento).
  const dateNow = new Date();   //? Fecha de hoy.
  const difference = targetDate.getTime() - dateNow.getTime();  //? Diferencia de fechas.
  const days = Math.ceil(difference / (1000 * 3600 * 24));    //? Calculo de los días.
  return days;

}

function renderEvents() {  //? Esta funcion imprime los datos ingresados en el DOM
  const eventsHTML = events.map(e => {
    return  `
              <section class="event>
                <article class="days">
                  <span class="days-number">${dateDiff(e.Date)}</span>  //? acá se verá la diferencia de días.
                  <span class="days-text">Días</span>
                </article>
                <article class="event-name">
                  <span>${e.name}</span>    //? acá se verá el nombre del evento.
                </article>
                <article class="event-date">
                  <span>${e.date}</span>  //? acá se verá el día asignado.
                </article>
                <div class="actions" data-id="${e.id}">  //? data-id es una metapropiedad para saber el id del elemento que quiero modificar/eliminar y proseguir con dicha accion.
                  <button class="bDelete">Eliminar</button>
                </div>
              </section>
            `;
  })
  eventsContainer.innerHTML = eventsHTML.join("");  //? Esto une el contenido de eventsContainer con el de eventsHTML gracias al metodo join().
  
}

