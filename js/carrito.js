
const contenedor = document.getElementById("productos-container")
const cantidadElement = document.getElementById("cantidad")
const precioElement = document.getElementById("precio")
const carritoVacioElement = document.getElementById("carrito-vacio")
const totalesContainer = document.getElementById("totales")


function crearTarjetasProductosCarrito() {
    contenedor.innerHTML = ""
    const productos = JSON.parse(localStorage.getItem("articulos"))
    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
            const nuevoArticulo = document.createElement("div")
            nuevoArticulo.classList = "producto-carrito"
            nuevoArticulo.innerHTML = `
     <img src= ${producto.img}>
     <h3>${producto.nombre}</h3>
     <p>$${producto.precio}</p>
     <div>
     <button>➖</button>
     <span class="cantidad">${producto.cantidad}</span>
     <button>➕</button>
     </div>
    `
            contenedor.appendChild(nuevoArticulo)
            nuevoArticulo.getElementsByTagName("button")[0].addEventListener("click", (e) => {
                const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0]
                cantidadElement.innerText = restarAlCarrito(producto)
                crearTarjetasProductosCarrito()
                actualizarTotales()
            })
            nuevoArticulo.getElementsByTagName("button")[1].addEventListener("click", (e) => {
                const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0]
                cantidadElement.innerText = agregarAlCarrito(producto)
                actualizarTotales()
            })
        })
    }
    revisarMensajeVacio()
    actualizarTotales()
    actualizarNumeroCarrito()
}

crearTarjetasProductosCarrito()


//ACTUALIZAR TOTAL 

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("articulos"))
    let cantidad = 0
    let precio = 0
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            cantidad += producto.cantidad
            precio += producto.precio * producto.cantidad
        })
    }
    cantidadElement.innerText = cantidad
    precioElement.innerText = precio
    if (precio === 0) {
        reiniciarCarrito()
        revisarMensajeVacio()
    }
}

document.getElementById("reiniciar").addEventListener("click", () => {
    contenedor.innerHTML = ""
    reiniciarCarrito()
    revisarMensajeVacio()
})

function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("articulos"))
    carritoVacioElement.classList.toggle("esconder", productos)
    totalesContainer.classList.toggle("esconder", !productos)
}

