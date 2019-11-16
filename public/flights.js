const getFlights = async () => {
  const data = await request("./../flights");
  const dashboard = create("table");
  const body = create("tbody");
  for (let i of data) {
    const row = create("tr");
    for (let j in i) {
      const col = create("td");
      col.innerHTML += `${j}=${i[j]}`;
      row.appendChild(col);
    }
    body.appendChild(row);
  }
  dashboard.appendChild(body);
  $("vuelos").appendChild(dashboard);
};

const $ = id => {
  return document.getElementById(id);
};

const create = element => {
  return document.createElement(element);
};

const request = async (url, options = { method: "GET" }) => {
  const resp = await fetch(url, options);
  return resp.json();
};

const vuelos = $("vuelos");
document.addEventListener("DOMContentLoaded", getFlights);
