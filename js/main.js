// Variables globales para el stock inicial
let stockTazas = 50;
let stockCuadernos = 100;
let stockLapices = 200;

// Array para almacenar el historial de facturas
let historialFacturas = [];

// Función principal que gestiona el menú de opciones
function gestionTienda() {
    let nombreUsuario = prompt("Bienvenido/a a la tienda. Por favor, ingrese su nombre:");

    while (true) {
        let opcion = prompt(`Hola ${nombreUsuario}. Elija una opción:\n1. Ingresar factura\n2. Historial de facturas\n3. Ver stock\n4. Salir`);

        switch (opcion) {
            case '1':
                ingresarFactura();
                break;
            case '2':
                mostrarHistorialFacturas();
                break;
            case '3':
                mostrarStock();
                break;
            case '4':
                alert("Gracias por utilizar el sistema de control de stock. ¡Hasta luego!");
                return;
            default:
                alert("Opción inválida. Por favor, elija una opción válida.");
        }
    }
}

// Función para ingresar una factura
function ingresarFactura() {
    let nombreCliente = prompt("Ingrese el nombre del cliente:");
    let producto = prompt("Ingrese el producto comprado (taza, cuaderno o lápiz):").toLowerCase();
    let cantidad = parseInt(prompt("Ingrese la cantidad comprada:"));

    // Validación de stock y actualización
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

// Función para registrar la factura en el historial
function registrarFactura(cliente, producto, cantidad) {
    let factura = {
        cliente: cliente,
        producto: producto,
        cantidad: cantidad,
        fecha: new Date().toLocaleDateString()
    };
    historialFacturas.push(factura);
}

// Función para mostrar el historial de facturas
function mostrarHistorialFacturas() {
    if (historialFacturas.length === 0) {
        alert("No hay facturas ingresadas aún.");
    } else {
        console.log("Historial de facturas:");
        historialFacturas.forEach(factura => {
            console.log(`${factura.cliente} compró ${factura.cantidad} ${factura.producto}(s) el ${factura.fecha}.`);
        });
    }
}

// Función para mostrar el stock actual
function mostrarStock() {
    console.log("Stock actual:");
    console.log(`Tazas: ${stockTazas}`);
    console.log(`Cuadernos: ${stockCuadernos}`);
    console.log(`Lápices: ${stockLapices}`);
}

// Iniciar la gestión de la tienda
gestionTienda();
