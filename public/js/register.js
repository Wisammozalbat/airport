function $(id) {
  return document.getElementById(id);
}

if (localStorage.getItem("token")) {
  window.location = "../views/dashboard.html";
}

$("loginLink").classList.remove("hide");
$("registerLink").classList.remove("hide");
$("logoutLink").classList.add("hide");

let registerUser = () => {
  console.log(105);
  body = {
    username: $("username").value,
    password: $("password").value,
    type_user_id: "1"
  };
  fetch("./../signup", {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({ "Content-Type": "application/json" })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.status == 200) {
        window.location = "../views/login.html";
      }
    });
};
$("register").addEventListener("click", registerUser);
