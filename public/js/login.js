function $(id) {
  return document.getElementById(id);
}

let login = () => {
  console.log(12);
  body = {
    username: $("username").value,
    password: $("password").value
  };
  fetch("./../login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({ "Content-Type": "application/json" })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.status == 200) {
        localStorage.setItem("token", JSON.stringify(res.token));
        localStorage.setItem("user", JSON.stringify(res.user));
        switch (res.user.type) {
          case 1:
            window.location = "../views/dashboard.html";
            break;
          case 2:
            window.location = "../views/dashboard.html";
            break;
          case 3:
            window.location = "../views/dashboard.html";
            break;
          default:
            break;
        }
      }
    });
};
$("login").addEventListener("click", login);
