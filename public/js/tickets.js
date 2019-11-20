function $(id) {
  return document.getElementById(id);
}

let x = location.href.split("?")[1];

let downloadTicket = async () => {
  await getTickets();
  console.log("listo");
  body = { content: $("container").innerHTML, type: 2 };
  console.log(body.content);
  fetch(`./../flights/${x}/reserve/download`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.status == 200) {
        $(
          "container"
        ).innerHTML += `<a href="../pdfs/${x}.pdf" download>descargar</a>
            `;
      } else {
        alert("Error");
      }
    });
};

let getTickets = async () => {
  console.log(localStorage.getItem("token"));
  await fetch(`./../flights/${x}/reserve`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      res.tickets.map(element => {
        let day = moment(element.day).format("DD/MM/YYYY");
        let birthday = moment(element.birthday).format("DD/MM/YYYY");
        let depHour = moment(element.departure_time)
          .zone("+00:00")
          .format("LT");
        let arrHour = moment(element.arrival_time)
          .zone("+00:00")
          .format("LT");
        $("ticketContainer").innerHTML += `
        <div class="ticket">
            <div class="ticket-header">
                <span>Identificacion del vuelo: ${element.id_flight}</span>
                <span>Fecha: ${day}</span>
                <span>N° Ticket: ${element.id_ticket}</span>
            </div>
            <div class="client-data">
                <span>Nombre: ${element.name}</span>
                <span>Apellido: ${element.lastname}</span>
                <span>Pasaporte: ${element.passport}</span>
                <span>Birthday: ${birthday}</span>
            </div>
            <div class="flight-data">
                <span>Puerta de embarque: ${element.dep_gate}</span>
                <span>Aeroperto de salida: ${element.departure_airport}, ${element.departure_airport_country}</span>
                <span>Hora de salida: ${depHour}</span>
                <span>Aeroperto de llegada: ${element.arrival_airport}, ${element.arrival_airport_country}</span>
                <span>Hora de llegada: ${arrHour}</span>
            </div>
        </div>
        `;
      });
    });
};
downloadTicket();
$("login").addEventListener("click", login);
