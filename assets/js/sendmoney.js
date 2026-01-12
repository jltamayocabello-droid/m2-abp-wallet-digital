// CONTACTOS PREDEFINIDOS

let  contacto1 = {
    nombre: "Ana Maria",
    apellido: "López",
    cuenta: "ES7620770024003102575766",
    alias: "Anita",
    nombreBanco: "Banco de Suriname"
};

let contacto2 = {
    nombre: "Carlos Eduardo",
    apellido: "García",
    cuenta: "ES7620770024003102575767",
    alias: "Carlitos",
    nombreBanco: "Banco de Sahel"
};

let contacto3 = { 
    nombre: "Luisa Fernanda",
    apellido: "Martínez",
    cuenta: "ES7620770024003102575768",
    alias: "Lulú",
    nombreBanco: "Banco de Yemen"
};

let contactos = [contacto1, contacto2, contacto3];

// FUNCIONES PARA MOSTRAR CONTACTOS EN EL DOM
function crearInfoContacto(contacto) {

    if(!contacto) return '';

    let { nombre, apellido, cuenta, alias, nombreBanco } = contacto;


        let InfoContacto = 
        `<li class="list-group-item">
                        <div class="contact-info">
                            <div class="contact-name"><strong> ${nombre} ${apellido}</strong></div>
                            <div class="contact-details">
                                <div><strong>Alias:</strong> ${alias}</div><div><strong>Cuenta:</strong> ${cuenta}</div>
                                
                                <div><strong>Banco:</strong> ${nombreBanco}</div>
                            </div>
                        </div>
                    </li>`;
    return InfoContacto;
}

// AGREGAR CONTACTOS AL DOM CON JQUERY
function agregarContactosDom(listaContactos) {
    const $listaElemento = $('#contactList');
    let elementosLista = '';
    
    $.each(listaContactos, function(index, contacto) {
        elementosLista += crearInfoContacto(contacto);
    });
    
    $listaElemento.html(elementosLista);
}

// EJECUTAR FUNCION PRINCIPAL
function main() {
    agregarContactosDom(contactos);
    // Llenar select de contactos al cargar la página
    llenarSelectContactos();
}

main();

// Actualizar saldo en pantalla usando la función global renderSaldo
function actualizarSaldoDOM() {
    if (typeof renderSaldo === 'function') {
        renderSaldo();
    }
}

// Utilidad para cerrar modales con Bootstrap 4
function cerrarModal(selector) {
    $(selector).modal('hide');
    // Forzar limpieza de backdrop
    setTimeout(function() {
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open');
    }, 100);
}

// EVENTO: Avisar cuando se agrega un contacto
$(document).on('contactoAgregado', function(event, contacto) {
    alert('Contacto agregado correctamente: ' + contacto.nombre + ' ' + contacto.apellido);
});

// EVENTO: Avisar cuando se realiza una transferencia
$(document).on('transferenciaExitosa', function(event, data) {
    alert('Transferencia realizada exitosamente a ' + data.contacto.nombre + ' por $' + data.monto);
});


// AGREGAR NUEVO CONTACTO
$('#btnGuardarContacto').on('click', function() {
    const nombre = $('#nombre').val();
    const apellido = $('#apellido').val();
    const cuenta = $('#cuenta').val();
    const alias = $('#alias').val();
    const nombreBanco = $('#nombreBanco').val();
    
    // VALIDAR QUE TODOS LOS CAMPOS ESTÉN LLENOS
    if (!nombre || !apellido || !cuenta || !alias || !nombreBanco) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    // CREAR NUEVO CONTACTO
    const nuevoContacto = {
        nombre: nombre,
        apellido: apellido,
        cuenta: cuenta,
        alias: alias,
        nombreBanco: nombreBanco
    };

    // CONFIRMAR AGREGAR CONTACTO
    var confirmar = confirm('¿Guardar contacto: ' + nombre + ' ' + apellido + ' (' + cuenta + ')?');
    if (!confirmar) {
        return;
    }
    
    // AGREGAR A LA LISTA DE CONTACTOS
    contactos.push(nuevoContacto);
    
    // ACTUALIZAR EL DOM
    agregarContactosDom(contactos);
    
    // LIMPIAR FORMULARIO
    $('#formAgregarContacto')[0].reset();
    
    // CERRAR MODAL
    cerrarModal('#modalAgregarContacto');

    // EVENTO GLOBAL DE CONTACTO AGREGADO
    $(document).trigger('contactoAgregado', nuevoContacto);
    
    console.log('Contacto agregado:', nuevoContacto);
});

// BUSCADOR DE CONTACTOS CON JQUERY
$('#searchContact').on('keyup', function() {
    var textoBusqueda = $(this).val().toLowerCase();
    
    // FILTRAR Y MOSTRAR/OCULTAR CONTACTOS USANDO JQUERY
    $('#contactList li').each(function() {
        var textoContacto = $(this).text().toLowerCase();
        
        if (textoContacto.indexOf(textoBusqueda) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});



// FUNCIÓN PARA LLENAR SELECT DE CONTACTOS
function llenarSelectContactos() {
    var $select = $('#contactoDestino');
    $select.html('<option value="">-- Selecciona un contacto --</option>');
    $.each(contactos, function(index, contacto) {
        $select.append('<option value="' + index + '">' + contacto.nombre + ' ' + contacto.apellido + ' |  ' + contacto.cuenta + ' | ' + contacto.nombreBanco + '   </option>');
    });
}

// MOSTRAR CONTACTOS PARA ENVIAR DINERO AL ABRIR MODAL
$('#modalEnviarDinero').on('show.bs.modal', function() {
    llenarSelectContactos();
    renderSaldo();
});

// ACTUALIZAR DATOS CUANDO SE SELECCIONA UN CONTACTO
$('#contactoDestino').on('change', function() {
    var index = $(this).val();
    
    if (index !== '') {
        var contactoSeleccionado = contactos[index];
        $('#cuentaDestino').val(contactoSeleccionado.cuenta);
        $('#bancoDestino').val(contactoSeleccionado.nombreBanco);
    } else {
        $('#cuentaDestino').val('');
        $('#bancoDestino').val('');
    }
});

// CONFIRMAR ENVÍO DE DINERO
$('#btnConfirmarEnvio').on('click', function() {
    var contactoIndex = $('#contactoDestino').val();
    var monto = Number($('#monto').val());
    var concepto = $('#concepto').val();
    
    // VALIDAR QUE HAYA CONTACTO SELECCIONADO
    if (contactoIndex === '') {
        alert('Por favor, selecciona un contacto');
        return;
    }
    
    // VALIDAR QUE EL MONTO SEA VÁLIDO
    if (!monto || monto <= 0) {
        alert('Por favor, ingresa un monto válido');
        return;
    }
    
    // VALIDAR QUE HAYA SALDO SUFICIENTE
    if (monto > saldo) {
        alert('Usted no tiene el saldo suficiente para realizar esta transferencia.');
        return;
    }
    
    var contacto = contactos[contactoIndex];
    
    // MOSTRAR CONFIRMACIÓN
    var mensaje = 'Enviar $' + monto + ' a ' + contacto.nombre + ' ' + contacto.apellido + 
                  ' (Cuenta: ' + contacto.cuenta + ')';
    
    if (concepto) {
        mensaje += '\nConcepto: ' + concepto;
    }
    
    if (confirm(mensaje + '\n\n¿Deseas confirmar la transferencia?')) {
        // Descontar saldo y refrescar DOM
        descontarSaldo(monto);
        actualizarSaldoDOM();
        
        // REGISTRAR TRANSACCIÓN EN LOCALSTORAGE
        let transacciones =
          JSON.parse(localStorage.getItem("transacciones")) || [];
        const transaccion = {
          tipo: "Transferencia",
          monto: monto,
          contacto: contacto.nombre + " " + contacto.apellido,
          concepto: concepto || "Sin concepto",
          fecha: new Date().toLocaleString("es-CL"),
        };
        transacciones.push(transaccion);
        localStorage.setItem("transacciones", JSON.stringify(transacciones));
        
        // LIMPIAR FORMULARIO
        $('#formEnviar')[0].reset();
        $('#cuentaDestino').val('');
        $('#bancoDestino').val('');
        
        // CERRAR MODAL
        $('#modalEnviarDinero').modal('hide');
        
        // DISPARAR EVENTO DE TRANSFERENCIA EXITOSA
        $(document).trigger('transferenciaExitosa', {
            contacto: contacto,
            monto: monto,
            concepto: concepto
        });
        
        console.log('Dinero enviado:', {
            contacto: contacto,
            monto: monto,
            concepto: concepto
        });
    }
});
