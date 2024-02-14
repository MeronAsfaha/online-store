const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get user info
  const username = loginForm["username"].value;
  const password = loginForm["password"].value;
  const data = { username, password };
  console.log(data);
  // log the user in
  fetch("http://localhost:1001/customers/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      if (data === undefined) {
        document.getElementById("message").innerHTML =
          "Invalid username or password";
      } else {
        localStorage.setItem("customer", JSON.stringify(data));
        document.getElementById("message").innerHTML = "Login Successful";
        setTimeout(() => {
          window.location.href = "/views/products.html";
        }, 2000);
      }
    })
    .catch((error) => console.log(error.message));
});
