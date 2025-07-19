(() => {
    let carrito = []
    const tbodyCarrito = document.getElementById("tbody-carrito")
    const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito")
    const btnFinalizarPedido = document.getElementById("btn-finalizar-pedido")
    const totalPedido = document.getElementById("total-pedido")
    const alertaVacio = document.getElementById("alerta-carrito-vacio")


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

    const habilitarCantidadItem = () => {
        tbodyCarrito.querySelectorAll(".input-cantidad").forEach((inputCantidad, index) => {
            inputCantidad.addEventListener("input", () => {
                const nuevaCantidad = parseInt(inputCantidad.value)
                carrito[index].cantidad = nuevaCantidad
                sessionStorage.setItem("carritoCompra", JSON.stringify(carrito))
                dibujarCarrito();
            })
        })
    }

    const dibujarCarrito = () => {
        alertaVacio.style.display = carrito.length > 0 ? "none" : "block"
        tbodyCarrito.innerHTML = "";
        carrito.map(item => {
            let fila =
                `<tr> 
                <td>${item.idProducto}</td>
                <td>${item.nombre}</td>
                <td class= "text-end">${item.precio.toFixed(2)}</td>
                <td class= "text-end">
                    <input type="number" class="form-control text-end input-cantidad" min="1" value = "${item.cantidad}"> 
                </td>
                <td class= "text-end">${item.precio.toFixed(2) * item.cantidad}</td>
                <td> <i class="bi bi-x-circle icono-eliminar" title="Eliminar item"></i> </td>
            </tr>`

            tbodyCarrito.innerHTML += fila
        })
        habilitarEliminarItem();
        habilitarCantidadItem();
        calcularTotalCarrito();
    }


    dibujarCarrito();

    btnVaciarCarrito.addEventListener("click", () => {
        tbodyCarrito.innerHTML = "";
        sessionStorage.removeItem("carritoCompra")
        carrito = []
        totalPedido.textContent = "0.00"
    });

    btnFinalizarPedido.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de finalizar el pedido.");
            return;
        }

        if (!sessionStorage.getItem("datosUser")) {
            alert("Debes iniciar sesión para finalizar el pedido.");
            return;
        }

        

        const datosUsuario = JSON.parse(sessionStorage.getItem("datosUser"))[0];
        const idCliente = datosUsuario.idcliente;

        
        const datosPedido = {
            idCliente: parseInt(idCliente),
            productos: carrito.map(item => ({
                idProducto: item.idProducto,
                precio: item.precio,
                cantidad: item.cantidad
            }))
        };

        
    console.log("📦 Objeto datosPedido a enviar:", datosPedido);

        fetch(window.SERVICIOURL + `/pedidos_maestro_detalle.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosPedido)
        })
            .then(response => response.json())
            .then(result => {
                console.log("Respuesta del backend:", result);
                if (result.status==="ok") {
                    alert("Pedido guardado correctamente con ID: " + result.idPedido);
                    alert("Pedido realizado con éxito");
                    sessionStorage.removeItem("carritoCompra");
                    carrito = [];
                    dibujarCarrito();
                } else {
                    alert("Error al realizar el pedido");
                    console.error("Respuesta del servidor:", result);
                }
            })
            .catch(error => {
                alert("Error de red o del servidor");
                console.error("Error en fetch:", error);
            });


    })

})()