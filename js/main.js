"use strict"
window.SERVICIOURL = "https://ecotasty.store/apiProgramacionWebIsil";

const menuData=[
    {label:"empleados",url:"/pages/empleados.html", script:"/js/pages/empleados.js"},
    {label:"inversiones",url:"/pages/inversiones.html"},
    {label:"proveedores",url:"/pages/proveedores.html", script:"/js/pages/proveedores.js"},
    {label:"tienda",url:"/pages/tienda.html", script:"/js/pages/tienda.js"},
    {label:"carrito",url:"/pages/carrito.html", script:"/js/pages/carrito.js"},

]

const menuMain = document.getElementById("menu-main")
const mainContent = document.getElementById("main-content")
const logoNavbarBrand = document.getElementById("logo-navbar-brand")


menuData.forEach(itemMenu=>{
    const liMenu = document.createElement("li")
    liMenu.className = "nav-item"
    const link = document.createElement("a")
    link.className = "nav-link"

    liMenu.appendChild(link)
    menuMain.appendChild(liMenu)

    link.innerText = itemMenu.label
    
    link.addEventListener("click",()=>{
        loadPage(itemMenu.url, itemMenu.script)
        // Quita 'active' de todos los enlaces
        menuMain.querySelectorAll("a").forEach(a => a.classList.remove("active"));

        // Pone 'active' en el link clickeado
        link.classList.add("active");
    })
})


const loadPage = (itemUrl, itemScript) => {
        fetch(itemUrl)
        .then(response=>response.text())
        .then(data=>{
            mainContent.innerHTML = data
            
            if(itemScript){
                const script = document.createElement("script")
                script.src = itemScript
                mainContent.appendChild(script)
            }
        })
}

logoNavbarBrand.addEventListener("click",()=>{
    loadPage("/pages/home.html","js/pages/home.js")
})

logoNavbarBrand.click()
// Se carga la página de inicio al cargar el script

