


//REDIRECCIONAMIENTO CON MENSAJE
document.addEventListener("DOMContentLoaded", function () {
  const mensajeRedireccion = document.getElementById("mensaje-redireccion");

  function redireccionar(mensaje, enlace) {
    if (mensajeRedireccion) {
      mensajeRedireccion.textContent = mensaje;
    }
    setTimeout(() => {
      window.location.href = enlace;
    }, 2000);
  }

  // WALLET BUTTON EVENT (Deposit or Withdraw)
  const btnWallet = document.getElementById("btnWallet");
  if (btnWallet) {
    btnWallet.addEventListener("click", function (event) {
      event.preventDefault();
      redireccionar(
        "Redirigiendo a Billetera Electrónica...",
        "wallet.html"
      );
    });
  }

  // EVENTO BOTÓN ENVIAR DINERO
  const btnSendMoney = document.getElementById("btnSendMoney");
  if (btnSendMoney) {
    btnSendMoney.addEventListener("click", function (event) {
      event.preventDefault();
      redireccionar("Redirigiendo a Enviar dinero...", "sendmoney.html");
    });
  }

  // EVENTO BOTÓN ÚLTIMOS MOVIMIENTOS
  const btnTransactions = document.getElementById("btnTransactions");
  if (btnTransactions) {
    btnTransactions.addEventListener("click", function (event) {
      event.preventDefault();
      redireccionar(
        "Redirigiendo a Últimos movimientos...",
        "transactions.html"
      );
    });
  }
});
