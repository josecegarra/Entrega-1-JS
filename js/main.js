document.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos(); // Cargar datos cuando la página esté lista
});

function iniciarTienda() {
    let nombreUsuario = document.getElementById('usuario').value;
    if (nombreUsuario) {
        mostrarMenu(nombreUsuario);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingrese un usuario.'
        });
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

function salir() {
    Swal.fire({
        icon: 'success',
        title: 'Gracias',
        text: 'Gracias por utilizar el sistema de control de stock. ¡Hasta luego!'
    }).then(() => {
        document.getElementById('contenido').innerHTML = "";
        document.getElementById('menu').style.display = "block";
    });
}

function volverMenu() {
    let nombreUsuario = document.getElementById('usuario').value;
    mostrarMenu(nombreUsuario);
}
