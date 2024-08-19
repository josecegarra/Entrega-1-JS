let productos = [];
let historialFacturas = [];

function cargarDatos() {
    fetch("./db/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            console.log('Productos cargados:', productos); // Verifica si los productos se cargan correctamente
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
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
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, complete todos los campos.'
        });
        return;
    }

    let productoEncontrado = productos.find(p => p.nombre === producto);

    if (productoEncontrado) {
        if (cantidad > productoEncontrado.stock) {
            Swal.fire({
                icon: 'error',
                title: 'Stock insuficiente',
                text: `No hay suficientes ${producto}s en stock.`
            });
        } else {
            productoEncontrado.stock -= cantidad;
            registrarFactura(nombreCliente, producto, cantidad);
            Swal.fire({
                icon: 'success',
                title: 'Factura ingresada',
                text: `Factura ingresada correctamente. Stock actual de ${producto}s: ${productoEncontrado.stock}`
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Producto no válido',
            text: 'Producto ingresado no válido.'
        });
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
    let contenido = `<h2>Stock Actual</h2>`;
    productos.forEach(producto => {
        contenido += `<p>${producto.nombre.charAt(0).toUpperCase() + producto.nombre.slice(1)}s: ${producto.stock}</p>`;
    });
    contenido += `<button onclick="volverMenu()">Volver</button>`;
    document.getElementById('contenido').innerHTML = contenido;
}
