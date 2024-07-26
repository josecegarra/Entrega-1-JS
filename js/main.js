let stockTazas = 50;
let stockCuadernos = 100;
let stockLapices = 200;

let historialFacturas = [];

function iniciarTienda() {
    let nombreUsuario = document.getElementById('usuario').value;
    if (nombreUsuario) {
        mostrarMenu(nombreUsuario);
    } else {
        alert("Por favor, ingrese un usuario.");
    }
}

function mostrarMenu(nombreUsuario) {
    let contenido = `
        <h2>Hola ${nombreUsuario}</h2>
        <button onclick="ingresarFactura()">Ingresar factura</button>
        <button onclick="mostrarHistorialFacturas()">Historial de facturas</button>
        <button onclick="mostrarStock()">Ver stock</button>
        <button onclick="salir()">Salir</button>
    `;
    document.getElementById('contenido').innerHTML = contenido;
}

function ingresarFactura() {
    let contenido = `
        <h2>Ingresar Factura</h2>
        <label for="nombreCliente">Nombre del Cliente:</label>
        <input type="text" id="nombreCliente">
        <label for="producto">Producto (taza, cuaderno o lápiz):</label>
        <input type="text" id="producto">
        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad">
        <button onclick="procesarFactura()">Procesar Factura</button>
        <button onclick="volverMenu()">Volver</button>
    `;
    document.getElementById('contenido').innerHTML = contenido;
}

function procesarFactura() {
    let nombreCliente = document.getElementById('nombreCliente').value;
    let producto = document.getElementById('producto').value.toLowerCase();
    let cantidad = parseInt(document.getElementById('cantidad').value);

    if (!nombreCliente || !producto || isNaN(cantidad)) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (producto === 'taza') {
        if (cantidad > stockTazas) {
            alert("No hay suficientes tazas en stock.");
        } else {
            stockTazas -= cantidad;
            registrarFactura(nombreCliente, producto, cantidad);
            alert(`Factura ingresada correctamente. Stock actual de tazas: ${stockTazas}`);
        }
    } else if (producto === 'cuaderno') {
        if (cantidad > stockCuadernos) {
            alert("No hay suficientes cuadernos en stock.");
        } else {
            stockCuadernos -= cantidad;
            registrarFactura(nombreCliente, producto, cantidad);
            alert(`Factura ingresada correctamente. Stock actual de cuadernos: ${stockCuadernos}`);
        }
    } else if (producto === 'lápiz' || producto === 'lapiz') {
        if (cantidad > stockLapices) {
            alert("No hay suficientes lápices en stock.");
        } else {
            stockLapices -= cantidad;
            registrarFactura(nombreCliente, producto, cantidad);
            alert(`Factura ingresada correctamente. Stock actual de lápices: ${stockLapices}`);
        }
    } else {
        alert("Producto ingresado no válido.");
    }
}

function registrarFactura(cliente, producto, cantidad) {
    let factura = {
        cliente: cliente,
        producto: producto,
        cantidad: cantidad,
        fecha: new Date().toLocaleDateString()
    };
    historialFacturas.push(factura);
}

function mostrarHistorialFacturas() {
    let contenido = `<h2>Historial de Facturas</h2>`;
    if (historialFacturas.length === 0) {
        contenido += `<p>No hay facturas ingresadas aún.</p>`;
    } else {
        contenido += `<ul>`;
        historialFacturas.forEach(factura => {
            contenido += `<li>${factura.cliente} compró ${factura.cantidad} ${factura.producto}(s) el ${factura.fecha}.</li>`;
        });
        contenido += `</ul>`;
    }
    contenido += `<button onclick="volverMenu()">Volver</button>`;
    document.getElementById('contenido').innerHTML = contenido;
}

function mostrarStock() {
    let contenido = `
        <h2>Stock Actual</h2>
        <p>Tazas: ${stockTazas}</p>
        <p>Cuadernos: ${stockCuadernos}</p>
        <p>Lápices: ${stockLapices}</p>
        <button onclick="volverMenu()">Volver</button>
    `;
    document.getElementById('contenido').innerHTML = contenido;
}

function salir() {
    alert("Gracias por utilizar el sistema de control de stock. ¡Hasta luego!");
    document.getElementById('contenido').innerHTML = "";
    document.getElementById('menu').style.display = "block";
}

function volverMenu() {
    let nombreUsuario = document.getElementById('usuario').value;
    mostrarMenu(nombreUsuario);
}
