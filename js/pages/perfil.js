(()=>{
    const datosUsuario = JSON.parse(sessionStorage.getItem("datosUser"))[0];

    console.log(datosUsuario);

/*     const tbodyUsuario = document.getElementById("tbody-usuario");
    tbodyUsuario.querySelector("tr:nth-child(1) td").textContent = datosUsuario.nombres */


    document.getElementById("td-nombre").textContent = datosUsuario.nombres;
    document.getElementById("td-cargo").textContent = datosUsuario.cargo ;
    document.getElementById("td-empresa").textContent = datosUsuario.cargo;
    document.getElementById("td-correo").textContent = datosUsuario.correo;
    document.getElementById("td-telefono").textContent = datosUsuario.telefono;
    document.getElementById("td-pais").textContent = datosUsuario.pais;

})()