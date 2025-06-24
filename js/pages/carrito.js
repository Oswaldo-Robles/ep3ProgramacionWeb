
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
                <td class= "text-end">${item.cantidad}</td>
                <td class= "text-end">${item.precio * item.cantidad }</td>
                <td class= "text-end">${item.precio.toFixed(2)}</td>
            </tr>`

        tbodyCarrito.innerHTML += fila
    })

    btnVaciarCarrito.addEventListener("click", ()=>{
        tbodyCarrito.innerHTML = "";
        sessionStorage.removeItem("carritoCompra")
        carrito = []
    })

})()