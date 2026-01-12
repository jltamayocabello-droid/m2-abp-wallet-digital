
// FORMULARIO DE INICIO DE SESIÓN
const formLogin = document.getElementById("form-login");

if (formLogin) {
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    //CREDENCIALES DE ACCESO SIMULADAS DE UNA BASE DE DATOS
    const email_db = "admin@wallet.com";
    const password_db = "12345";

    //CAPTURA DE DATOS DEL FORMULARIO
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    //VERIFICACIÓN DE CREDENCIALES
    if (email === email_db && password === password_db) {
      //PERSISTENCIA DE SESIÓN (SIMULADA)
      localStorage.setItem("isLoggedIn", "true");
      
      //MENSAJE DE BIENVENIDA SI LAS CREDENCIALES SON CORRECTAS
      alert("Inicio de sesión exitoso");
      formLogin.reset();

      //REDIRECCIÓN AL MENÚ PRINCIPAL
      window.location.href = "menu.html";

      //MENSAJE DE ERROR SI LAS CREDENCIALES SON INCORRECTAS
    } else {
      alert("Credenciales incorrectas. Por favor, intenta nuevamente.");
    }
  });
}

