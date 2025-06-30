(() => {
    const tbodyCliente = document.getElementById("tbody-cliente");
    const btnRetroceder = document.getElementById("btn-retroceder");
    const btnAvanzar = document.getElementById("btn-avanzar");
    const numeroPaginacion = document.getElementById("numero-paginacion");
    const totalDatos = document.getElementById("total-datos");

    let numeroPagina = 1;
    let filasPagina = 10;
    let totalPaginas = 0;

    const crearBotonesNavegacion = () => {

        while(numeroPaginacion.children.length>2){
            numeroPaginacion.removeChild(numeroPaginacion.children[1]);
        }

        for (let i = totalPaginas; i >= 1; i--) {
            const liPagina = document.createElement("li");
            liPagina.className = "page-item";

            const aPagina = document.createElement("a");
            aPagina.className="page-link";
            aPagina.setAttribute("href", "#");
            aPagina.textContent = i;

            liPagina.appendChild(aPagina);
            numeroPaginacion.insertBefore(liPagina, numeroPaginacion.children[1]);

            aPagina.addEventListener("click", ()=>{
                numeroPagina = i;
                dibujarTabla();
            })
        }

        numeroPaginacion.querySelector("li:nth-child("+ (numeroPagina+1) + ")").classList.add("active")
    }

    const dibujarTabla = () => {
        fetch(window.SERVICIOURL + `/clientesPaginacion.php?filasPagina=${filasPagina}&numeroPagina=${numeroPagina}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.clientes)

                totalPaginas = Math.ceil(data.Total / filasPagina);
                console.log(totalPaginas);

                totalDatos.textContent=`Total de filas: ${data.Total}`;

                tbodyCliente.innerHTML = "";
                //funciona 
                data.clientes.map(item => {
                    fila = `
                <tr> 
                    <td>${item.idcliente}</td>
                    <td>${item.empresa}</td>
                    <td>${item.nombres}</td>
                    <td>${item.cargo}</td>
                    <td>${item.ciudad}</td>
                    <td>${item.pais}</td>
                </tr>
                `
                    tbodyCliente.innerHTML += fila
                })
                crearBotonesNavegacion();
            })
    }
    dibujarTabla();

    btnRetroceder.addEventListener("click", () => {
        if (numeroPagina > 1) {
            numeroPagina--;
            dibujarTabla();
        } else {
            console.log("No puedes retroceder más");
        }
    })

    btnAvanzar.addEventListener("click", () => {
        if (numeroPagina < totalPaginas) {
            numeroPagina++;
            dibujarTabla();
        } else {
            console.log("No puedes avanzar más")
        }
    })

})()