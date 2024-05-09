let productos = []

fetch("./js/articulos.json")
    .then(response => response.json())
    .then(data => {
        articulos = data
        crearTarjetasProductosInicio(articulos)
    })



const contenedorTarjetas = document.getElementById("productos-container")

function crearTarjetasProductosInicio(productos) {
    productos.forEach(producto => {
        const nuevoArticulo = document.createElement("div")
        nuevoArticulo.classList = "tarjeta-producto"
        nuevoArticulo.innerHTML = `
     <img src= ${producto.img}>
     <h3>${producto.nombre}</h3>
     <p class= "precio">$${producto.precio}</p>
     <button>Agregar al carrito</button>
    `
        contenedorTarjetas.appendChild(nuevoArticulo)
        nuevoArticulo.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto))
    })
}

crearTarjetasProductosInicio(productos)
