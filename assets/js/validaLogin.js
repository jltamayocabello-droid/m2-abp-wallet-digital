// VERIFICACION DE LOGIN
(function () {
  const login = localStorage.getItem("isLoggedIn");

  //LOGIN NO AUTORIZADO, REDIRECCIÓN AL INICIO DE SESIÓN
  if (login !== "true") {
    alert("Acceso no autorizado. Redirigiendo al inicio de sesión.");
    window.location.href = "index.html";
  }
})();