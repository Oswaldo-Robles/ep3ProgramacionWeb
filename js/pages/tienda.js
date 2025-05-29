(() => {

    const listaCategorias = document.getElementById('list-categorias');

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

            })

    }

    const dibujarProductos = (data) => {
        const gripProductos = document.getElementById("grid-productos")
        gripProductos.innerHTML = "";

        data.forEach(itemProducto => {
            const imagenProducto = window.SERVICIOURL + (itemProducto.imagenchica
                ? "/" +itemProducto.imagenchica
                : "/imagenes/nofoto.jpg");

            const card = `
                        <div class="col">
                            <div class="card h-100">
                                    <div class="card-body">
                                    <img src="${imagenProducto}" class="card-img-top" alt="imagen del empreado">
                                    <p class="card-title">${itemProducto.nombre}</p>
                                    <p class="card-text">S/. ${itemProducto.precio.toFixed(2)} </p>
                                </div>
                            </div>
                `
            gripProductos.innerHTML += card
        });



    }

})();