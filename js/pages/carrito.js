
(() => {
    let carrito = []
    const tbodyCarrito = document.getElementById("tbody-carrito")
    const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito")

    carrito = JSON.parse(sessionStorage.getItem("carritoCompra"))

    carrito.map(item => {

        let fila =
            `<tr> 
                <td>${item.idProducto}</td>
                <td>${item.nombre}</td>
                <td>${item.precio}</td>
                <td>${item.cantidad}</td>
                <td>${item.precio * item.cantidad }</td>
            </tr>`

        tbodyCarrito.innerHTML += fila
    })

    btnVaciarCarrito.addEventListener("click", ()=>{
        tbodyCarrito.innerHTML = "";
        sessionStorage.removeItem("carritoCompra")
        carrito = []
    })

})()