function $(id) {
  return document.getElementById(id);
}

let showDetails = id_flight => {
  window.location = `../views/details.html?${id_flight}`;
};

let getFlights = () => {
  console.log(13);
  fetch("./../flights", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      res.map(element => {
        let date = new Date(element.day).toLocaleDateString();
        $("tbody").innerHTML += `<tr>
            <td>${date}</td>
            <td>${element.departure_airport}</td>
            <td>${element.arrival_airport}</td>
            <td>${element.airline_name}</td>
            <td><a class="btnShowMore" onClick="showDetails(${element.id_flight})">ver mas</a></td>
        </tr>`;
      });
    });
};
getFlights();
$("login").addEventListener("click", login);
