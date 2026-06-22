const API_URL = "https://inventario-backend1-1.onrender.com/productos";
// Función para consultar los datos guardados en MongoDB Atlas
const API_URL = 'http://localhost:3000/productos';

// 1. Función para obtener y mostrar productos
async function obtenerProductos() {
    const respuesta = await fetch(API_URL);
    const productos = await respuesta.json();
    const tabla = document.getElementById('tabla');
    
    tabla.innerHTML = ''; // Limpiar tabla antes de recargar
    
    productos.forEach(prod => {
        tabla.innerHTML += `
            <tr>
                <td>${prod.nombre}</td>
                <td>$${prod.precio}</td>
                <td>${prod.existencia}</td>
            </tr>
        `;
    });
}

// 2. Función para registrar un nuevo producto
document.getElementById('formProducto').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        existencia: document.getElementById('existencia').value
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
    });

    // Limpiar formulario y actualizar tabla
    e.target.reset();
    obtenerProductos();
});

// Cargar productos al abrir la página
obtenerProductos();