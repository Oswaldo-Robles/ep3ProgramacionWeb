"use strict"
window.SERVICIOURL = "https://ecotasty.store/apiProgramacionWebIsil";

const menuData = [{
        ubicacion: 1,
        label: "empleados",
        url: "pages/empleados.html",
        script: "js/pages/empleados.js"
    },
    {
        ubicacion: 1,
        label: "inversiones",
        url: "pages/inversiones.html"
    },
    {
        ubicacion: 1,
        label: "proveedores",
        url: "pages/proveedores.html",
        script: "js/pages/proveedores.js"
    },
    {
        ubicacion: 1,
        label: "tienda",
        url: "pages/tienda.html",
        script: "js/pages/tienda.js"
    },
    {
        ubicacion: 2,
        label: "carrito",
        url: "pages/carrito.html",
        script: "js/pages/carrito.js",
        icon: "bi bi-cart"
    },
    {
        ubicacion: 2,
        label: "Iniciar sesión",
        url: "pages/iniciarSesion.html",
        script: "js/pages/iniciarSesion.js",
        icon: "bi bi-person-circle"
    }
]

const menuMain = document.getElementById("menu-main")
const menuRight = document.getElementById("menu-rigth")
const mainContent = document.getElementById("main-content")
const logoNavbarBrand = document.getElementById("logo-navbar-brand")


menuData.map(itemMenu => {
    const liMenu = document.createElement("li");
    liMenu.className = "nav-item";

    const link = document.createElement("a");
    link.className = "nav-link";
    link.innerHTML = itemMenu.label;

    liMenu.appendChild(link);
    if (itemMenu.ubicacion === 1) {
        menuMain.appendChild(liMenu);
    } else if (itemMenu.ubicacion === 2) {
        menuRight.appendChild(liMenu)
    }

    if (itemMenu.icon) {
        const icon = document.createElement("i");
        icon.className = itemMenu.icon;
        link.append(icon);
    }

    link.addEventListener("click", () => {
        loadPage(itemMenu.url, itemMenu.script)
        // Quita 'active' de todos los enlaces
        menuMain.querySelectorAll("a").forEach(a => a.classList.remove("active"));
        menuRight.querySelectorAll("a").forEach(a => a.classList.remove("active"));
        // Pone 'active' en el link clickeado
        link.classList.add("active");
    })
})


const loadPage = (itemUrl, itemScript) => {
    fetch(itemUrl)
        .then(response => response.text())
        .then(data => {
            mainContent.innerHTML = data

            if (itemScript) {
                const script = document.createElement("script")
                script.src = itemScript
                mainContent.appendChild(script)
            }
        })
}

const agregarItemCarrito = (itemCarrito, cantidad) => {

    const precioFinal = itemCarrito.preciorebajado === 0 ? itemCarrito.precio : itemCarrito.preciorebajado;
    //console.log(precioFinal)

    const nuevoItem = {
        idProducto: itemCarrito.idproducto,
        nombre: itemCarrito.nombre,
        precio: precioFinal,
        cantidad: cantidad,
    };

    const carrito = JSON.parse(sessionStorage.getItem("carritoCompra")) || [];

    const index = carrito.findIndex(item => item.idProducto === nuevoItem.idProducto);

    if (index !== -1) {
        carrito[index].cantidad += nuevoItem.cantidad
    } else {
        carrito.push(nuevoItem);
    }

    //carrito.push(nuevoItem)
    sessionStorage.setItem("carritoCompra", JSON.stringify(carrito))





}

logoNavbarBrand.addEventListener("click", () => {
    loadPage("pages/home.html", "js/pages/home.js")
})

logoNavbarBrand.click()
// Se carga la página de inicio al cargar el script