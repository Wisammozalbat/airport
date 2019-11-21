function $(id) {
  return document.getElementById(id);
}

let logout = async () => {
  fetch("./../logout", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.status == 200) {
        localStorage.clear();
      }
    });
};
$("logoutLink").addEventListener("click", logout);
