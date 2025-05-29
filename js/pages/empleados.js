

(() => {

    const gridEmpleados = document.getElementById("grid-empleados")

    fetch(window.SERVICIOURL+"/empleados.php")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            data.forEach(itemEmpleado => {
                const card = `
                        <div class="col">
                            <div class="card h-100">
                            <img src="${window.SERVICIOURL}/fotos/${itemEmpleado.foto}" class="card-img-top" alt="imagen del empreado">
                                <div class="card-body">
                                    <h5 class="card-title">${itemEmpleado.nombreCompleto}</h5>
                                    <p class="card-text">${itemEmpleado.cargo} </p>
                                </div>
                            </div>
                `
                gridEmpleados.innerHTML += card

            });

            /*

            data.forEach(itemProveedor => {
                const fila = document.createElement("tr")
                const celda1 = document.createElement("td")
                const celda2 = document.createElement("td")
                const celda3 = document.createElement("td")
                const celda4 = document.createElement("td")
                const celda5 = document.createElement("td")
                const celda6 = document.createElement("td")

                celda1.textContent = itemProveedor.idproveedor
                celda2.textContent = itemProveedor.nombreempresa
                celda3.textContent = itemProveedor.nombrecontacto
                celda4.textContent = itemProveedor.cargocontacto
                celda5.textContent = itemProveedor.ciudad
                celda6.textContent = itemProveedor.pais

                fila.appendChild(celda1)
                fila.appendChild(celda2)
                fila.appendChild(celda3)
                fila.appendChild(celda4)
                fila.appendChild(celda5)
                fila.appendChild(celda6)
                document.getElementById("tbody-proveedor").appendChild(fila)

            });

            */
        })


})()