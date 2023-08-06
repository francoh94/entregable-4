const socketClient = io()

const formulario = document.getElementById('formulario')
const productoInput = document.getElementById('producto')
const divproductos = document.getElementById('divproductos');

formulario.onsubmit = (e)=>{
    e.preventDefault()
    socketClient.emit('producto',productoInput.value)
    
}
socketClient.on('todoslosproductos',(productos)=>{
    const todoslosproductos = productos.map(objproductos=>{
        return `
          <div>
            <p>${objproductos.producto}</p>
            <button class="eliminar-btn" data-producto="${objproductos.producto}">Eliminar</button>
          </div>
        `;
    }).join('');
    divproductos.innerHTML = todoslosproductos;

    // Agregar un listener para los botones de eliminar
    const eliminarBtns = document.querySelectorAll('.eliminar-btn');
    eliminarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productoAEliminar = e.target.getAttribute('data-producto');
            socketClient.emit('eliminarProducto', productoAEliminar);
        });
    });
});
