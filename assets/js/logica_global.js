


//LOGIN AUTORIZADO

let saldo = Number(localStorage.getItem("saldo")) || 15_000;

function renderSaldo() {
  const montoSaldo = document.getElementById("monto-saldo");
  if (montoSaldo) {
    // MOSTRAR CON SIMBOLO $ Y FORMATO
    montoSaldo.textContent = "$ " + Number(saldo).toLocaleString("es-CL");
  }
}
// MOSTRAR SALDO INICIAL AL CARGAR EL DOM
document.addEventListener('DOMContentLoaded', renderSaldo);

// SINCRONIZAR SALDO AL CAMBIAR LOCALSTORAGE (OTRA PESTANA/PAGINA)
window.addEventListener('storage', function(event) {
  if (event.key === 'saldo') {
    saldo = Number(event.newValue) || 0;
    renderSaldo();
  }
});



// LÓGICA DE SALDO

if (localStorage.getItem("saldo")) {
  saldo = Number(localStorage.getItem("saldo"));
} else {
  localStorage.setItem("saldo", saldo);
}

function descontarSaldo(monto) {
  saldo = saldo - monto;

  if (saldo < 0) {
    alert("Usted no cuenta con fondos suficientes.");
  } else {
    localStorage.setItem("saldo", saldo);

    return saldo;
  }
}

function aumentarSaldo(monto) {
  saldo = saldo + monto;
  localStorage.setItem("saldo", saldo);

  return saldo;
}



// LÓGICA HISTORIAL TRANSACCIONES

//TRANSFERENCIA A OTRAS CUENTAS DE EJEMPLO
let transaccion1 = {
  monto: 1_000,
  origen: "Cuenta personal",
  destino: "Carlitos",
  glosa: "Transferencia a otras cuentas",
  ingreso: 0,
  egreso: 1_000,
  fecha: new Date(),
};

//DEPÓSITO MISMA CUENTA DE EJEMPLO
let transaccion2 = {
  monto: 19_000,
  origen: "Cuenta personal",
  destino: "Cuenta personal",
  glosa: "Depósito de dinero",
  ingreso: 19_000,
  egreso: 0,
  fecha: new Date(),
};

  //RETIRO MISMA CUENTA DE EJEMPLO
  let transaccion3 = {
    monto: 3_500,
    origen: "Cuenta personal",    
    destino: "Cuenta personal",
    glosa: "Retiro de dinero",
    ingreso: 0,
    egreso: 3_500,
    fecha: new Date(),
};

//HISTORIAL DE TRANSACCIONES
let historialTransacciones = [transaccion1, transaccion2, transaccion3];

// INICIALIZAR/RESETEAR LOCALSTORAGE CON TRANSACCIONES DE EJEMPLO SI FALTAN O ESTÁN VACÍAS
function seedTransaccionesEjemplo() {
  const ejemplo = [
    {
      tipo: "Transferencia",
      monto: 1500,
      contacto: "Carlitos",
      concepto: "Transferencia a otras cuentas",
      fecha: new Date().toLocaleString("es-CL"),
    },
    {
      tipo: "Depósito",
      monto: 19000,
      fecha: new Date().toLocaleString("es-CL"),
    },
    {
      tipo: "Retiro",
      monto: 3500,
      fecha: new Date().toLocaleString("es-CL"),
    },
  ];
  localStorage.setItem("transacciones", JSON.stringify(ejemplo));
}

try {
  const raw = localStorage.getItem("transacciones");
  const arr = raw ? JSON.parse(raw) : null;
  if (!Array.isArray(arr) || arr.length === 0) {
    seedTransaccionesEjemplo();
  }
} catch (e) {
  seedTransaccionesEjemplo();
}

//FUNCION PARA AGREGAR TRANSACCION AL HISTORIAL
function agregarTransaccionHistorial(transaccion) {
  historialTransacciones.push(transaccion);
}
