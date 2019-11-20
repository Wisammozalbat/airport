function $(id) {
  return document.getElementById(id);
}
let x = location.href.split("?")[1];

console.log(x);
window.onpageshow = () => {
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
  let container = $("dataContainer");
  container.innerHTML = `
  <div class="details flightData">
    <span>Identificacion del vuelo: ${data.id_flight}</span>
    <span>Aerolinea: ${data.airline_name}</span>
    <span>Fecha: ${day}</span>
  </div>
  <div class="details descripcion">
    Descripcion: ${data.description}
  </div>
  <div class="details airportData">
    <span>Aeropuerto de salida: ${data.departure_airport}, ${data.departure_airport_country}</span>
    <span>Aeropuerto de llegada: ${data.arrival_airport}, ${data.arrival_airport_country}</span>
    <span>Hora de salida: ${depHour}</span>
    <span>Hora de llegada: ${arrHour}</span>
    <span>Duracion: ${duration}</span>
  </div>
  <div class="details status">Estatus: ${data.status}</div>
  <div class="details googleMaps"></div>`;
};
