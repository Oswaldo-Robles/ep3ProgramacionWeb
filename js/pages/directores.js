(() => {
    const tbodyDirector = document.getElementById("tbody-directores");
    const formInsert = document.getElementById("form-insert");

    const dibujarTabla = () => {
        fetch(window.SERVICIOURL + `/directores/directores.php`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                tbodyDirector.innerHTML = "";

                data.map(item => {
                    fila = `
                <tr> 
                    <td>${item.iddirector}</td>
                    <td>${item.nombres}</td>
                    <td>${item.peliculas}</td>
                    <td> <i class="bi bi-pencil icono-editar" title="editar director"> </i> </td>
                    <td> <i class="bi bi-x-square icono-eliminar" title="eliminar director"> </i> </td>
                </tr>
                `
                    tbodyDirector.innerHTML += fila
                })

            })
    }
    dibujarTabla();

    const insertDirector = () =>{
        event.preventDefault();
        console.log("hola");
    }

    formInsert.addEventListener("submit", (event) =>
        insertDirector(event)
    )


})()