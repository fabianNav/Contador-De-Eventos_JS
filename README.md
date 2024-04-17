```sh 
 Insertar datos en el DOM

  
  const eventsHTML = events.map(e => {
   return  `

             <section class="event>

              acá se verá la diferencia de días.

               <article class="days">
                 <span class="days-number">${dateDiff(e.Date)}</span>
                 <span class="days-text">Días</span>
               </article>










              acá se verá el nombre del evento.
               <article class="event-name">
                 <span>${e.name}</span>
               </article>
               <article class="event-date">





               acá se verá el día asignado.
                 <span>${e.date}</span>
               </article>





                data-id es una metapropiedad para saber el id del elemento que quiero modificar/eliminar y proseguir con dicha accion.
               <div class="actions" data-id="${e.id}">  
                 <button class="bDelete">Eliminar</button>
               </div>
             </section>
           `;
 })
```
