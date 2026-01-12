
// LÓGICA DE DEPÓSITO Y RETIRO

// FORMULARIO DE DEPÓSITO
const formDeposit = document.getElementById("form-deposit");
if (formDeposit) {
  formDeposit.addEventListener("submit", (event) => {
    event.preventDefault();

    //CAPTURA DE DATOS DEL FORMULARIO
    let depositAmount = document.getElementById("depositAmount").value;
    depositAmount = Number(depositAmount);

    //VALIDACIÓN DE MONTO
    if (depositAmount <= 0) {
      alert("Ingrese un monto válido.");
      return;
    }

    //AUMENTAR SALDO
    const nuevoSaldo = aumentarSaldo(depositAmount);

    //MENSAJE DE ÉXITO
    alert(
      `Depósito exitoso de $ ${depositAmount.toLocaleString("es-CL")}. Nuevo saldo: $ ${nuevoSaldo.toLocaleString("es-CL")}`
    );
    formDeposit.reset();

    //ACTUALIZAR SALDO EN PANTALLA
    renderSaldo();

    //REGISTRAR TRANSACCIÓN
    let transacciones =
      JSON.parse(localStorage.getItem("transacciones")) || [];
    const transaccion = {
      tipo: "Depósito",
      monto: depositAmount,
      fecha: new Date().toLocaleString("es-CL"),
    };
    transacciones.push(transaccion);
    localStorage.setItem("transacciones", JSON.stringify(transacciones));
  });
}

// FORMULARIO DE RETIRO
const formWithdraw = document.getElementById("form-withdraw");
if (formWithdraw) {
  formWithdraw.addEventListener("submit", (event) => {
    event.preventDefault();

    //CAPTURA DE DATOS DEL FORMULARIO
    let withdrawAmount = document.getElementById("withdrawAmount").value;
    withdrawAmount = Number(withdrawAmount);

    //VALIDACIÓN DE MONTO
    if (withdrawAmount <= 0) {
      alert("Ingrese un monto válido.");
      return;
    }

    //DESCONTAR SALDO
    const nuevoSaldo = descontarSaldo(withdrawAmount);

    if (nuevoSaldo !== undefined) {
      //MENSAJE DE ÉXITO
      alert(
        `Retiro exitoso de $ ${withdrawAmount.toLocaleString("es-CL")}. Nuevo saldo: $ ${nuevoSaldo.toLocaleString("es-CL")}`
      );
      formWithdraw.reset();

      //ACTUALIZAR SALDO EN PANTALLA
      renderSaldo();

      //REGISTRAR TRANSACCIÓN
      let transacciones =
        JSON.parse(localStorage.getItem("transacciones")) || [];
      const transaccion = {
        tipo: "Retiro",
        monto: withdrawAmount,
        fecha: new Date().toLocaleString("es-CL"),
      };
      transacciones.push(transaccion);
      localStorage.setItem("transacciones", JSON.stringify(transacciones));
    }
  });
}
