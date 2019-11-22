function $(id) {
  return document.getElementById(id);
}

let x = location.href.split("?")[1];

let downloadTicket = async () => {
  await getTickets();
  console.log("listo");
  body = {
    content: $("container").innerHTML,
    css: `
    <style>
    .ticket-container {border: 1px solid black;}
    .row {width: 80%;margin: 30px auto;padding: 10px;}
    span {font-weight: 700;}
    .download-btn {font-size: 30px;border: 1px solid rgb(17, 219, 101);padding: 10px 30px;text-transform: uppercase;
      font-weight: 700;letter-spacing: 2px;color: white;background-color: rgb(91, 231, 150);text-shadow: 0 0 2px black;
      border-radius: 5px;}
    .download-btn:hover {border: 1px solid rgb(16, 192, 89);background-color: rgb(78, 201, 129);}
    .col .row {margin-left: -0.75rem;margin-right: -0.75rem;}
    .row {margin-left: auto;margin-right: auto;margin-bottom: 20px;}
    .col {float: left;-webkit-box-sizing: border-box;box-sizing: border-box;padding: 0 0.75rem;min-height: 1px;}
    .row .s7 {width: 58.3333333333%;margin-left: auto;left: auto;right: auto;}
    .row .col.s12{width:100%;margin-left:auto;left:auto;right:auto}
    .row .col.s3{width:25%;margin-left:auto;left:auto;right:auto}
    .row .col.s4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}
    .row .col.s5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}
    .row .col.s6{width:50%;margin-left:auto;left:auto;right:auto}
    .row .col.s7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}
    .row .col.offset-s1{margin-left:8.3333333333%}
    </style>
    `
  };
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
        $("container").innerHTML += `
        <div class="row">
          <div class="col s12">
            <div class="col s5 offset-s1"><a class="download-btn" href="../pdfs/${x}.pdf" download>descargar</a></div>
          </div>
        </div>`;
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
        <div class="row ticket-container">
          <div class="col s12">
            <div class="col s3 offset-s1"><span>Identificacion del vuelo:</span> ${element.id_flight}</div>
            <div class="col s3"><span>Fecha:</span> ${day}</div>
            <div class="col s3"><span>N° Ticket:</span> ${element.id_ticket}</div>
          </div>
          <div class="col s12">
            <div class="col s5 offset-s1"><span>Nombre:</span> ${element.name}</div>
            <div class="col s6"><span>Pasaporte:</span> ${element.passport}</div>
            <div class="col s5 offset-s1"><span>Apellido:</span> ${element.lastname}</div>
            <div class="col s6"><span>Birthday:</span> ${birthday}</div>
          </div>
          <div class="col s12">
            <div class="col s5 offset-s1"><span>Puerta de embarque:</span> ${element.dep_gate}</div>
            <div class="col s6"><span>Aeroperto de salida:</span> ${element.departure_airport}, ${element.departure_airport_country}</div>
            <div class="col s5 offset-s1"><span>Hora de salida:</span> ${depHour}</div>
            <div class="col s6"><span>Aeroperto de llegada:</span> ${element.arrival_airport}, ${element.arrival_airport_country}</div>
            <div class="col s5 offset-s1"><span>Hora de llegada:</span> ${arrHour}</div>
          </div>
        </div>
        `;
      });
    });
};
downloadTicket();
