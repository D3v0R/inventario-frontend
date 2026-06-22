const API_URL = 'http://localhost:3000/productos';

// 1. Obtener y mostrar productos
async function obtenerProductos() {
    const res = await fetch(API_URL);
    const productos = await res.json();
    mostrarTabla(productos);
}

// 2. Función para renderizar la tabla (necesaria para que aparezcan editar y eliminar)
function mostrarTabla(productos) {
    const tabla = document.getElementById('tabla');
    tabla.innerHTML = '';
    productos.forEach(p => {
        tabla.innerHTML += `<tr>
            <td>${p.nombre}</td>
            <td>$${p.precio}</td>
            <td>${p.existencia}</td>
            <td>
                <button onclick="editarProducto('${p._id}', '${p.nombre}', ${p.precio}, ${p.existencia})" style="background:orange; color:white; border:none; padding:5px;">Editar</button>
                <button onclick="eliminarProducto('${p._id}')" style="background:red; color:white; border:none; padding:5px;">Eliminar</button>
            </td>
        </tr>`;
    });
}

// 3. Función de Búsqueda (Filtra en tiempo real)
function filtrarProductos() {
    const busqueda = document.getElementById('busqueda').value.toLowerCase();
    fetch(API_URL)
        .then(res => res.json())
        .then(productos => {
            const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda));
            mostrarTabla(filtrados);
        });
}

// 4. Función de Edición
async function editarProducto(id, nombre, precio, existencia) {
    const n = prompt("Nuevo nombre:", nombre);
    const p = prompt("Nuevo precio:", precio);
    const e = prompt("Nueva cantidad:", existencia);
    if (n && p && e) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nombre: n, precio: p, existencia: e })
        });
        obtenerProductos();
    }
}

// 5. Función de Eliminación
async function eliminarProducto(id) {
    if(confirm('¿Seguro que deseas eliminar este producto?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        obtenerProductos();
    }
}

// Cargar la tabla al iniciar
obtenerProductos();