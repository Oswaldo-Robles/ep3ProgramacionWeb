(() => {
    let carrito = []
    const tbodyCarrito = document.getElementById("tbody-carrito")
    const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito")
    const totalPedido = document.getElementById("total-pedido")

    carrito = JSON.parse(sessionStorage.getItem("carritoCompra"))

    const calcularTotalCarrito = () => {
        const subtotal = carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0);
        totalPedido.textContent = subtotal.toFixed(2);
    }

    const habilitarEliminarItem = () => {
        tbodyCarrito.querySelectorAll(".icono-eliminar").forEach((iconoEliminar, index) => {
            iconoEliminar.addEventListener("click", () => {
                carrito.splice(index, 1)
                sessionStorage.setItem("carritoCompra", JSON.stringify(carrito))
                dibujarCarrito();
            })
        })
    }

    const dibujarCarrito = () => {
        tbodyCarrito.innerHTML = "";
        carrito.map(item => {
            let fila =
                `<tr> 
                <td>${item.idProducto}</td>
                <td>${item.nombre}</td>
                <td class= "text-end">${item.precio.toFixed(2)}</td>
                <td class= "text-end">${item.cantidad }</td>
                <td class= "text-end">${item.precio.toFixed(2)*item.cantidad}</td>
                <td> <i class="bi bi-x-circle icono-eliminar" title="Eliminar item"></i> </td>
            </tr>`

            tbodyCarrito.innerHTML += fila
        })
        habilitarEliminarItem();
        calcularTotalCarrito();
    }


    dibujarCarrito();

    btnVaciarCarrito.addEventListener("click", () => {
        tbodyCarrito.innerHTML = "";
        sessionStorage.removeItem("carritoCompra")
        carrito = []
        totalPedido.textContent = "0.00"
    })

})()