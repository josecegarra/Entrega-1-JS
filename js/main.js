let productos = [
    { nombre: 'taza', stock: 50 },
    { nombre: 'cuaderno', stock: 100 },
    { nombre: 'lápiz', stock: 200 },
    { nombre: 'mate', stock: 10 },
    { nombre: 'termo', stock: 10 },
    { nombre: 'bombilla', stock: 10 }
];

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
        <label for="producto">Producto (taza, cuaderno, lápiz, mate, termo o bombilla):</label>
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

    let productoEncontrado = productos.find(p => p.nombre === producto);

    if (productoEncontrado) {
        if (cantidad > productoEncontrado.stock) {
            alert(`No hay suficientes ${producto}s en stock.`);
        } else {
            productoEncontrado.stock -= cantidad;
            registrarFactura(nombreCliente, producto, cantidad);
            alert(`Factura ingresada correctamente. Stock actual de ${producto}s: ${productoEncontrado.stock}`);
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
    `;
    productos.forEach(producto => {
        contenido += `<p>${producto.nombre.charAt(0).toUpperCase() + producto.nombre.slice(1)}s: ${producto.stock}</p>`;
    });
    contenido += `<button onclick="volverMenu()">Volver</button>`;
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
