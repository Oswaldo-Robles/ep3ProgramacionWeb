(() => {
    const formLogin = document.getElementById("form-login");

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
            })
    });
})();