(() => {

    fetch(window.SERVICIOURL+"/envios.php")//Se indica la URL del servicio web
        .then((response) => response.json())//Así se indica que los datos que se recibirán son de tipo JSON
        .then((data) => {//esta variable es la que contiene los datos que se reciben del servicio web 
            console.log(data);
            data.map((envio) => {//Con map se examina fila a fila todos los datos que se reciben del servicio web
                //envio es una variable que representa a cada fila de datos
                console.log(envio.nombre);


                let fila = "<tr><td>" + envio.idempresaenvio + "</td><td>" + envio.nombre
                    + "</td><td>" + envio.telefono + "</td><td>" + envio.latitud
                    + "</td><td>" + envio.longitud + "</td></tr>"

                document.getElementById("tbody-envios").innerHTML += fila
            })
        })

    let officeInfo = document.getElementById("office-info")
    const officeList = document.getElementById("office-list")

    const officeData = [
        { office: "Berlin", url: "contend/berlin.html" },
        { office: "Londres", url: "contend/londres.html" },
        { office: "Paris", url: "contend/paris.html" },
        { office: "Praga", url: "contend/praga.html" },
        { office: "Roma", url: "contend/roma.html" },
        { office: "Madrid", url: "contend/madrid.html" },
        { office: "Perú", url: "contend/peru.html" },
        { office: "Argentina", url: "contend/argentina.html" },
        { office: "Chile", url: "contend/chile.html" },
    ]

    officeData.forEach(itemOffice => {
        const liOffice = document.createElement("li")
        liOffice.classList.add("list-group-item")
        liOffice.innerText = itemOffice.office
        officeList.appendChild(liOffice)

        liOffice.addEventListener("click", () => {
            // Se eliminan las clases active de todos los elementos de la lista
            officeList.querySelectorAll("li").forEach(li => {
                li.classList.remove("active")
            })

            // Se añade la clase active al elemento de la lista que se ha clicado
            liOffice.classList.add("active")

            fetch(itemOffice.url)
                .then(response => response.text())
                .then(data => {
                    officeInfo.innerHTML = data
                })
        })
    })

    officeList.querySelector("li").click()

})()