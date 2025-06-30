(() => {
    const tbodyDirector = document.getElementById("tbody-directores");
    const formInsert = document.getElementById("form-insert");
    const formUpdate = document.getElementById("form-update");

    const dibujarTabla = () => {
        fetch(window.SERVICIOURL + `/directores/directores.php`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                tbodyDirector.innerHTML = "";

                data.map(item => {
                    const fila = `
                <tr> 
                    <td>${item.iddirector}</td>
                    <td>${item.nombres}</td>
                    <td>${item.peliculas}</td>
                    <td> <i class="bi bi-pencil icono-editar" title="editar director" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-Update"> </i> </td>
                    <td> <i class="bi bi-x-square icono-eliminar" title="eliminar director"> </i> </td>
                </tr>
                `
                    tbodyDirector.innerHTML += fila
                })

                tbodyDirector.querySelectorAll(".icono-editar").forEach((iconoEditar, index) => {
                    iconoEditar.addEventListener("click", () => {
                        document.getElementById("updateIdDirector").value = data[index].iddirector;
                        document.getElementById("updateNombreDirector").value = data[index].nombres;
                        document.getElementById("updatePeliculaDirector").value = data[index].peliculas;
                    })
                })
            })

    }
    dibujarTabla();

    const insertDirector = (event) => {
        event.preventDefault();
        const formData = new FormData(formInsert);
        /* console.log(formData.get("nombre")+ " " + formData.get("pelicula")); //funciona */

        fetch(window.SERVICIOURL + `/directores/directoresInsert.php`, {
                method: "POST",
                body: formData
            })
            .then((response) => response.text())
            .then(data => {
                console.log(data);
                dibujarTabla();
                formInsert.reset();
                document.querySelector("#offcanvasRight .btn-close").click();

            })
    }

    const updateDirector = (event) => {
        event.preventDefault();
        const formData = new FormData(formUpdate);
        console.log(formData.get("iddirector") + " " + formData.get("nombres") + " " + formData.get("peliculas")); //funciona


        fetch(window.SERVICIOURL + `/directores/directoresUpdate.php`, {
                method: "POST",
                body: formData
            })
            .then((response) => response.text())
            .then(data => {
                console.log(data);
                dibujarTabla();
                formUpdate.reset();
                document.querySelector("#offcanvas-Update .btn-close").click();
            })
    }


    formInsert.addEventListener("submit", (event) =>
        insertDirector(event)
    );

    formUpdate.addEventListener("submit", (event) =>
        updateDirector(event)
    );





})()