(() => {

    const listaCategorias = document.getElementById('list-categorias');
    const gripProductos = document.getElementById("grid-productos");
    let productosCategoria = [];

    fetch(window.SERVICIOURL + "/categoria.php")
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);

            data.forEach(itemCategoria => {
                const card = `
 
                <li class="list-group-item" title="${itemCategoria.descripcion}">${itemCategoria.nombre} (${itemCategoria.Total})</li>

                `
                listaCategorias.innerHTML += card

            });

            selectCategorias(data);

        })

    const selectCategorias = (data) => {

        const listItem = document.querySelectorAll('#list-categorias li');

        listItem.forEach((item, index) => {
            item.addEventListener('click', () => {
                //console.log(data[index]);

                item.classList.add('active');
                listItem.forEach((otherItem, otherIndex) => {
                    if (otherIndex !== index) {
                        otherItem.classList.remove('active');
                    }
                });

                document.getElementById("categoria-nombre").textContent = data[index].nombre;
                document.getElementById("categoria-descripcion").textContent = data[index].descripcion;
                document.getElementById("categoria-total").textContent = data[index].Total;

                mostrarProductos(data[index].idcategoria);

            });
        });

        listItem[0].click(); // Simula un clic en el primer elemento para cargar los productos al inicio

    }

    const mostrarProductos = (idCategoria) => {

        fetch(window.SERVICIOURL + `/productosCategoria.php?idcategoria=${idCategoria}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                dibujarProductos(data);
                productosCategoria = data
            })
    }

    const dibujarProductos = (data) => {
        gripProductos.innerHTML = "";

        data.forEach(itemProducto => {

            const precioLista = Number(itemProducto.precio);
            const precioOferta = Number(itemProducto.preciorebajado);
            const precioFinal = precioOferta === 0 ? precioLista : precioOferta;

            const mostrarPrecioAnterior = precioOferta === 0 ?
                "" : `<span class="text-decoration-line-through text-secondary precio-anterior">S/.-${precioLista.toFixed(2)}</span>`;

            const porcentajeDescuento = precioOferta === 0 ?
                "" : `<span class="badge bg-danger porcentaje-descuento">-${Math.round((1 - (precioFinal / precioLista)) * 100)}%</span>`;

            const imagenProducto = window.SERVICIOURL + (itemProducto.imagenchica
                ? "/" + itemProducto.imagenchica
                : "/imagenes/nofoto.jpg");

            const card = `
                        <div class="col">
                            <div class="card h-100">
                                    <div class="card-body">
                                        <img src="${imagenProducto}" class="card-img-top img-producto" alt="imagen del producto">
                                        <i class="bi bi-eye icono-vista-rapida"  data-bs-toggle="modal" data-bs-target="#vista-rapida-modal"> </i>

                                        <p class="card-title mt-4">${itemProducto.nombre} ${porcentajeDescuento}</p>
                                
                                        <p class="card-text">S/. ${precioFinal.toFixed(2)}   ${mostrarPrecioAnterior} </p>
                                    </div>
                            </div>
                        </div>
                `
            gripProductos.innerHTML += card
        });

        gripProductos.querySelectorAll('.icono-vista-rapida').forEach((iconoVistaRapida, index) => {
            iconoVistaRapida.addEventListener('click', () => mostrarProductoVistaRapida(index));

        })

        gripProductos.querySelectorAll('.img-producto').forEach((imagenProducto, index) => {
            imagenProducto.addEventListener('click', () => mostrarDetalleProducto(index));
        });

    }

    const mostrarDetalleProducto = (index) => {
        let productoSelecionadoId = productosCategoria[index].idproducto;

        fetch(window.SERVICIOURL + `/productosDetalle.php?idproducto=${productoSelecionadoId}`)
            .then((response) => response.json())
            .then((dataDetalle) => {
                let rutaImagen = `${window.SERVICIOURL}/${dataDetalle[0].imagengrande}`;

                const precioLista = Number(dataDetalle[0].precio);
                const precioOferta = Number(dataDetalle[0].preciorebajado);
                const precioFinal = precioOferta === 0 ? precioLista : precioOferta;

                const mostrarPrecioAnterior = precioOferta === 0 ?
                    "" : `<span class="text-decoration-line-through text-secondary precio-anterior">S/.-${precioLista.toFixed(2)}</span>`;

                document.getElementById("producto-detalle-nombre").textContent = dataDetalle[0].nombre;
                document.getElementById("producto-detalle-imagen").setAttribute("src", rutaImagen);
                document.getElementById("producto-detalle-detalle").textContent = `${dataDetalle[0].detalle}`;
                document.getElementById("producto-detalle-stock").textContent = `${dataDetalle[0].unidadesenexistencia}`;
                document.getElementById("producto-detalle-precio").innerHTML = `S/.${precioFinal.toFixed(2)} ${mostrarPrecioAnterior}`;

            })
    }

    

    const mostrarProductoVistaRapida = (index) => {
        let productoSelecionadoId = productosCategoria[index].idproducto;

        fetch(window.SERVICIOURL + `/productosVistaRapida.php?idproducto=${productoSelecionadoId}`)
            .then((response) => response.json())
            .then((dataDetalle) => {
                let rutaImagen = `${window.SERVICIOURL}/${dataDetalle[0].imagengrande}`;

                const precioLista = Number(dataDetalle[0].precio);
                const precioOferta = Number(dataDetalle[0].preciorebajado);
                const precioFinal = precioOferta === 0 ? precioLista : precioOferta;

                const mostrarPrecioAnterior = precioOferta === 0 ?
                    "" : `<span class="text-decoration-line-through text-secondary precio-anterior">  S/.-${precioLista.toFixed(2)}</span>`;


                document.getElementById("producto-detaller-nombre").textContent = dataDetalle[0].nombre;
                document.getElementById("producto-detalle-imagen").setAttribute("src", rutaImagen);
                document.getElementById("producto-detalle-detalle").textContent = `${dataDetalle[0].detalle}`;
                document.getElementById("producto-detalle-stock").textContent = `${dataDetalle[0].unidadesenexistencia}`;
                document.getElementById("producto-detalle-precio").innerHTML = `S/.${precioFinal.toFixed(2)} ${mostrarPrecioAnterior}`;

            })
    }

})();