function $(id) {
  return document.getElementById(id);
}
let x = location.href.split("?")[1];

console.log(x);
window.onpageshow = () => {
  if (localStorage.getItem("token")) {
    $("loginLink").classList.add("hide");
    $("registerLink").classList.add("hide");
    $("logoutLink").classList.remove("hide");
  } else {
    $("loginLink").classList.remove("hide");
    $("registerLink").classList.remove("hide");
    $("logoutLink").classList.add("hide");
  }
  data = [];
  fetch(`./../flights/${x}`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    })
  })
    .then(res => res.json())
    .then(res => {
      showData(res.vuelo);
    });
};

let showData = data => {
  initMap();
  console.log(data);
  let day = moment(data.day).format("DD/MM/YYYY");
  let depHour = moment(data.departure_time)
    .zone("+00:00")
    .format("LT");
  let arrHour = moment(data.arrival_time)
    .zone("+00:00")
    .format("LT");
  let aux = moment(data.arrival_time).diff(moment(data.departure_time));
  let duration = moment(aux)
    .zone("+00:00")
    .format("h:mm");
  duration.startsWith("1:")
    ? (duration = duration + " hr")
    : (duration = duration + " hrs");
  console.log(duration);
  console.log(day);

  let map;

  let container = $("dataContainer");
  container.innerHTML = `
  <div class="row details-container">
    <div class="col s12">
      <div class="col s3 offset-s1">Identificacion del vuelo: ${data.id_flight}</div>
      <div class="col s3">Aerolinea: ${data.airline_name}</div>
      <div class="col s3">Fecha: ${day}</div>
    </div>
    <div class="col s12">
      <div class="col s11 offset-s1">Descripcion: ${data.description}</div>
    </div>
    <div class="col s12">
      <div class="col s5 offset-s1">Aeropuerto de salida: ${data.departure_airport}, ${data.departure_airport_country}</div>
      <div class="col s6">Aeropuerto de llegada: ${data.arrival_airport}, ${data.arrival_airport_country}</div>
      <div class="col s5 offset-s1">Hora de salida: ${depHour}</div>
      <div class="col s6">Hora de llegada: ${arrHour}</div>
      <div class="col s5 offset-s1">Estatus: ${data.status}</div>
      <div class="col s6">Duracion: ${duration}</div>
    </div>
    <div class="col s12">
      <div class="col s11 offset-s1"><a href="../views/tickets.html?${data.id_flight}">Ver mis pasajes para este vuelo<a></div>
    </div>
  </div>`;
};

let initMap = () => {
  map = new google.maps.Map($("map"), {
    center: {
      lat: parseFloat(data.departure_latiud),
      lng: parseFloat(data.departure_longitud)
    },
    zoom: 2
  });

  let coords = [
    {
      lat: parseFloat(data.departure_latiud),
      lng: parseFloat(data.departure_longitud)
    },
    {
      lat: parseFloat(data.arrival_latiud),
      lng: parseFloat(data.arrival_longitud)
    }
  ];

  let line = new google.maps.Polyline({
    path: coords,
    geodesic: true,
    strokeColor: "red",
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  line.setMap(map);
};
