(() => {
    const formLogin = document.getElementById("form-login");

    const mostrarPerfil = () =>{
        fetch("pages/perfil.html")
            .then((response) => response.text())
            .then((data) => {
                mainContent.innerHTML = data
                const script = document.createElement("script")
                script.src = "js/pages/perfil.js"
                mainContent.appendChild(script)
            })
    }

    const evaluarInicioSesion = (data) =>{
        switch(data){
            case -1:
                alert("La cuenta no existe");
                break;
            case -2:
                alert("La clave es incorrecta");
                break;
            default:
                alert("Bienvenido");
                mostrarPerfil();
                sessionStorage.setItem("datosUser", JSON.stringify(data));

                break;
        }
    }

    formLogin.addEventListener("submit", (event) => {
        event.preventDefault(); // ← importante!
        const formData = new FormData(formLogin);
        console.log(formData.get("correo_telefono") + " " + formData.get("clave"));

        fetch(window.SERVICIOURL + `/iniciarSesion.php`, {
                method: "POST",
                body: formData
            })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                formLogin.reset();
                evaluarInicioSesion(data);
            })
    });

    document.getElementById("mostrar-Clave").addEventListener("change",(event)=>{
        const inputClave = document.getElementById("input-clave");
        inputClave.setAttribute("type", event.target.checked ? "text" : "password")
    })


})();