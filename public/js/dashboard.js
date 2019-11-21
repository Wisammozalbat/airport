function $(id) {
  return document.getElementById(id);
}

let showDetails = id_flight => {
  window.location = `../views/details.html?${id_flight}`;
};

let getFlights = () => {
  if (localStorage.getItem("token")) {
    $("loginLink").classList.add("hide");
    $("registerLink").classList.add("hide");
    $("logoutLink").classList.remove("hide");
  } else {
    $("loginLink").classList.remove("hide");
    $("registerLink").classList.remove("hide");
    $("logoutLink").classList.add("hide");
  }
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
        $("tbody").innerHTML += `<tr class="tr">
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
