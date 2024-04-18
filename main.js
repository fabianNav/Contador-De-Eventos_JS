import './css/style.css'

//TODO Variables.
let events = [];
let arr = []; //? Sirve para cargar informacion y asignarla a eventos.

const eventName = document.getElementById('eventName');
const eventDate = document.getElementById('eventDate');
const buttonAdd = document.getElementById('bAdd');
const eventsContainer = document.getElementById('eventsContainer');

const json = load();

try {
  arr = JSON.parse(json);
} catch (error) {
  arr = [];
}
events = arr ? [ ...arr ] : [];

renderEvents();


document.getElementById('formEvents').addEventListener('submit', (e) => {
  e.preventDefault();
  addEvent();
})

function addEvent() {     //? Esta funcion hace que todas las funciones se junten y de ahí se van al evento principal.
//TODO Evento principal
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

  save(JSON.stringify(events));

  eventName.value = "";

  renderEvents();
}

function dateDiff(d) { //? la "d" dentro del dateDiff hace referencia a los datos que pondremos, por ejemplo: dateDiff(eventDate.value) < 0, en este caso la "d" sería "eventDate.value".  
  //? Esta funcion regresa el numero de dias que faltan de la fecha actual a la fecha destino 
//TODO Calcular diferencia de días.
  //! Si el valor es negativo entonces no creara el evento(añadirlo a la lista).
  const targetDate = new Date(d); //? Fecha objetivo (fecha del evento).
  const dateNow = new Date();   //? Fecha de hoy.
  const difference = targetDate.getTime() - dateNow.getTime();  //? Diferencia de fechas.
  const days = Math.ceil(difference / (1000 * 3600 * 24));    //? Calculo de los días.
  return days;

}

function renderEvents() {  //? Esta funcion imprime los datos ingresados en el DOM
//TODO Insertar datos en el DOM
  const eventsHTML = events.map(e => {
    return  `
              <section class="event">
                <article class="days">
                  <span class="days-number">${dateDiff(e.date)}</span>
                  <span class="days-text">Días</span>
                </article>
                <article class="event-name">
                  <span>${e.name}</span>     
                </article>
                <article class="event-date">
                  <span>${e.date}</span>  
                </article>
                <div class="actions">  
                  <button class="bDelete" data-id="${e.id}">Eliminar</button>
                </div>
              </section>
            `;
  })
  eventsContainer.innerHTML = eventsHTML.join("");  //? Esto une el contenido de eventsContainer con el de eventsHTML gracias al metodo join().

//TODO Borrar evento
  document.querySelectorAll('.bDelete').forEach(button => {
    button.addEventListener('click', e => {
      const id = button.getAttribute('data-id');
      events = events.filter((event) => event.id !== id)  //? Filtra los eventos y compara los id del evento seleccionado con el evento de la lista, así devolvera una nueva lista pero sin el evento que eliminamos.
      renderEvents();
    });
  });
}

function save(data) {
  localStorage.setItem('items', data);
}

function load() {
  return localStorage.getItem('items');
}

//TODO Modo oscuro
const colorDelSistema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const slider = document.getElementById('slider');
const setTheme = (tema) => {
  document.documentElement.setAttribute('data-theme', tema);
  localStorage.setItem('theme', tema);
}
slider.addEventListener('click', () => {
  let switchToTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
  setTheme(switchToTheme);
});
setTheme(localStorage.getItem('theme') || colorDelSistema);
