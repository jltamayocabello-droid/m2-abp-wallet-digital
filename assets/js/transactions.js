let historialTransaccionesDOM = $("#historialTransaccionesDOM");

function agregarTransaccionesDOM(listaTransacciones) {
  let transacciones = "";

  function formatearMonto(transaccion) {
    // Soporta estructuras con {tipo, monto} o {ingreso, egreso, monto}
    let formatoMonto = Number(transaccion.monto).toLocaleString("es-CL");
    let valor = `<span class="text-danger">- $ ${formatoMonto}</span>`;

    if (transaccion && typeof transaccion.tipo === "string") {
      if (transaccion.tipo === "Depósito") {
        valor = `<span class="text-success">+ $ ${formatoMonto}</span>`;
      } else {
        valor = `<span class="text-danger">- $ ${formatoMonto}</span>`;
      }
    } else if (
      typeof transaccion.ingreso === "number" ||
      typeof transaccion.egreso === "number"
    ) {
      if (Number(transaccion.ingreso) > 0) {
        valor = `<span class="text-success">+ $ ${formatoMonto}</span>`;
      } else if (Number(transaccion.egreso) > 0) {
        valor = `<span class="text-danger">- $ ${formatoMonto}</span>`;
      }
    }

    return valor;
  }

  function obtenerGlosa(transaccion) {
    if (transaccion && typeof transaccion.tipo === "string") {
      if (transaccion.tipo === "Transferencia" && transaccion.contacto) {
        return `Transferencia a ${transaccion.contacto}`;
      }
      return transaccion.tipo;
    }
    if (transaccion && transaccion.glosa) {
      return transaccion.glosa;
    }
    return "Transacción";
  }

  listaTransacciones.forEach((transaccion) => {
    let glosa = obtenerGlosa(transaccion);
    let fecha = transaccion.fecha;

    let fechaObj = new Date(fecha);
    let formatoFecha = fecha;

    let elementoMonto = formatearMonto(transaccion);

    transacciones += `
        <li class="list-group-item ">
            <strong>${glosa}</strong>
            <br><strong>Monto:</strong> ${elementoMonto} 
            <br><strong>Fecha:</strong> <small class="text-muted">${formatoFecha}</small>
        </li>
        `;
  });

  historialTransaccionesDOM.html(transacciones);
}

function main() {
  // LEER TRANSACCIONES DE LOCALSTORAGE
  let transaccionesGuardadas = [];
  try {
    const raw = localStorage.getItem("transacciones");
    transaccionesGuardadas = raw ? JSON.parse(raw) : [];
  } catch (e) {
    transaccionesGuardadas = [];
  }

  // Fallback: si está vacío, usar la variable global historialTransacciones si existe
  if (
    (!Array.isArray(transaccionesGuardadas) || transaccionesGuardadas.length === 0) &&
    Array.isArray(window.historialTransacciones) &&
    window.historialTransacciones.length > 0
  ) {
    transaccionesGuardadas = window.historialTransacciones.map((t) => ({
      tipo: t.glosa || "Transacción",
      monto: Number(t.monto) || 0,
      fecha:
        t.fecha instanceof Date
          ? t.fecha.toLocaleString("es-CL")
          : String(t.fecha),
    }));
  }
  agregarTransaccionesDOM(transaccionesGuardadas);
}

$(document).ready(main);
