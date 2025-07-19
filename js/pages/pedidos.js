(()=>{
    const cajaPedidos = document.getElementById("caja-pedidos");

    let numeroPagina = 1;
    let filasPagina = 20;

    const calcularSubTotal = (cantidad, precio) => {
        return (cantidad * precio).toFixed(2);
    };

    const formatearDosDecimales = (valor) => {
        return parseFloat(valor).toFixed(2);
    };

    const cargarPedidos = () => {
        fetch(`${window.SERVICIOURL}/pedidos.php?filas_pagina=${filasPagina}&numero_pagina=${numeroPagina}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                data.pedidos.forEach(pedido => {
                    let detallePedido = "";
                    let totalPedido = 0;

                    pedido.detalle.forEach(itemProducto => {
                        const precio = formatearDosDecimales(itemProducto.precio);
                        const subtotal = calcularSubTotal(itemProducto.cantidad, itemProducto.precio);
                        totalPedido += parseFloat(subtotal);
                        const filaItem = `
                            <div class="row">
                                <div class="col-1"> ${itemProducto.idproducto} </div>
                                <div class="col-3"> ${itemProducto.nombre} </div>
                                <div class="col-1 text-end"> ${precio} </div>
                                <div class="col-1 text-end"> ${itemProducto.cantidad}  </div>
                                <div class="col-1 text-end"> ${subtotal} </div>
                            </div>
                        `;
                        detallePedido += filaItem;
                    });

                    const filaPedido = `
                    <div class="row p-2" data-bs-toggle="collapse" href="#collapsePedido${pedido.idpedido}" role="button" aria-expanded="false" aria-controls="collapseExample">
                        <div class="col-1">${pedido.idpedido}</div>
                        <div class="col-1 text-end">${formatoFecha(pedido.fechapedido)}</div>
                        <div class="col-3">${pedido.cliente}</div>
                        <div class="col-2">${pedido.empresaenvio ?? "Sin asignar"}</div>
                        <div class="col-3">${pedido.destinatario ?? "Sin asignar"}</div>
                        <div class="col-2">${pedido.vendedor ?? "Venta online"}</div>
                    </div>

                    <div class="collapse" id="collapsePedido${pedido.idpedido}">
                        <div class="card card-body">
                            <div class="row fw-bold">
                                <div class="col-1"> Código</div>
                                <div class="col-3"> Producto </div>
                                <div class="col-1 text-end"> Precio </div>
                                <div class="col-1 text-end"> Cantidad</div>
                                <div class="col-1 text-end"> Subtotal</div>
                            </div>

                            ${detallePedido}

                            <div class="row fw-bold">
                                <div class="col-6 text-end"> Total </div>
                                <div class="col-1 text-end"> ${totalPedido.toFixed(2)} </div>
                            </div>
                        </div>
                    </div>
                    `;

                    cajaPedidos.innerHTML += filaPedido;
                });
                numeroPagina++;
            });
    }

    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            cargarPedidos();
        }
    });

    cargarPedidos();

})()