const cuentaCarritoElement = document.getElementById("cuenta-carrito")

// AGREGAR AL CARRITO 

function agregarAlCarrito(producto) {

    Toastify({
        text: "Agregaste un producto😎",
        duration: 2000,
        destination: "../html/cart.html",
        newWindow: true,
        close: true,
        offset: {
            x: "2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "6rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#efd9ce",
          borderRadius: "10px",
          color: "#2b2d42"
        },
        onClick: function(){} // Callback after click
      }).showToast();

    let memoria = JSON.parse(localStorage.getItem("articulos"))
    let cantidadProductoFinal

    if (!memoria || memoria.length === 0) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto)
        localStorage.setItem("articulos", JSON.stringify([nuevoProducto]))
        actualizarNumeroCarrito()
        cantidadProductoFinal = 1
    } else {
        const indiceProducto = memoria.findIndex(articulo => articulo.id === producto.id)
        const nuevaMemoria = memoria

        if (indiceProducto === -1) {
            const nuevoProducto = getNuevoProductoParaMemoria(producto)
            nuevaMemoria.push(nuevoProducto)
            cantidadProductoFinal = 1
        } else {

            nuevaMemoria[indiceProducto].cantidad++
            cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad
        }
        localStorage.setItem("articulos", JSON.stringify(nuevaMemoria))
        actualizarNumeroCarrito()
        return cantidadProductoFinal
    }
}

//RESTAR DEL CARRITO UN PRODUCTO

function restarAlCarrito(producto) {

    Toastify({
        text: "Eliminaste un producto",
        duration: 2000,
        close: true,
        offset: {
            x: "2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "6rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#efd9ce",
          borderRadius: "10px",
          color: "#2b2d42"
        },
        onClick: function(){} // Callback after click
      }).showToast();


    let memoria = JSON.parse(localStorage.getItem("articulos"))
    let cantidadProductoFinal = 0
    const indiceProducto = memoria.findIndex(articulo => articulo.id === producto.id)
    let nuevaMemoria = memoria
    nuevaMemoria[indiceProducto].cantidad--
    cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad
    if (cantidadProductoFinal === 0) {
        nuevaMemoria.splice(indiceProducto, 1)
    }
    localStorage.setItem("articulos", JSON.stringify(nuevaMemoria))
    actualizarNumeroCarrito()
    return cantidadProductoFinal
}


// LE AGREGO 1 Y LO DEVUELVO 
function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = producto
    nuevoProducto.cantidad = 1
    return nuevoProducto
}

//FUNCION PARA ACTUALIZAR EL N° DEL CARRITO 

function actualizarNumeroCarrito() {
    let cuenta = 0
    const memoria = JSON.parse(localStorage.getItem("articulos"))
    if (memoria && memoria.length > 0) {
        cuenta = memoria.reduce((acc, cur) => acc + cur.cantidad, 0)
        return cuentaCarritoElement.innerText = cuenta
    }
    cuentaCarritoElement.innerText = 0
}

function reiniciarCarrito() {
    localStorage.removeItem("articulos")
    actualizarNumeroCarrito()
}


actualizarNumeroCarrito()