//Mensaje de bienvenida
const wrapper = document.getElementById('welcome');
wrapper.innerHTML = '<h1>Bienvenidos a Finance</h1>'


//Construyo a través de una class constructor un objeto vacio
class Cliente{
    constructor(nombre, apellido, edad, dni, caja, esCliente){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = Number(edad);
        this.dni = Number(dni);
        this.caja = Number(caja);
        this.esCliente = esCliente;
    }
}
//Creo un array vacio
const clientes = [];

//Agrego clientes a mi array
clientes.push(new Cliente("Ramon", "Sanchez", 35, 33256789, 100000, true));
clientes.push(new Cliente("Ana", "Silva", 38, 30111999, 80000, true));
clientes.push(new Cliente("Juana", "Rincón", 52, 23111555, 120000, true));
clientes.push(new Cliente("Marcos", "Juarez", 39, 29950854, 180000, true));
clientes.push(new Cliente("Mario", "Rivera", 45, 26888741, 74000, true));
clientes.push(new Cliente("Jesús", "Lopez", 65, 10852963, 115000, true));
clientes.push(new Cliente("Clara", "Mendoza", 59, 16951753, 93000, true));
clientes.push(new Cliente("Rosa", "Alfaro", 48, 25111000, 150000, true));
clientes.push(new Cliente("Martin", "Calderón", 27, 40159999, 120000, true));
clientes.push(new Cliente("Raúl", "Ruiz", 41, 28852000, 95000, true));
clientes.unshift(new Cliente("Juan", "Perez", 25, 42111222, 0, false));
clientes.push(new Cliente("Pedro", "Gomez", 62, 14789456, 50000, true));
clientes.push(new Cliente("Maria", "Marquez", 36, 33111147, 75000, true));
clientes.push(new Cliente("Carlos", "Gonzalez", 51, 23123423, 0, false));

//Consulto elemento de mi array
console.log(clientes.length);

//Elimino a los no clientes de mi array
clientes.pop();
clientes.shift();

//Recorro mi array de objetos (Información solo se muestra a modo de ejercicio pero en la práctica es información sensible que no debe mostrarse)
for (const cliente of clientes){
    let div = document.createElement("div");
    div.innerHTML = `<h2>${cliente.nombre} ${cliente.apellido}</h2>
                    <p>Edad: ${cliente.edad}, DNI: ${cliente.dni}, Dinero disponible para invertir: ${cliente.caja}</p>
                    <hr>`;
    // document.body.appendChild(div);//para ver mis clientes en el HTML
} 

//Filtro en un nuevo array a los clientes que cuentan con mas de $75000 para invertir
const mayores = clientes.filter(cliente => cliente.caja > 75000)
console.log(mayores);

//Muestro los apellidos de mis clientes
const listaApellidos = clientes.map(cliente => cliente.apellido)
console.log(listaApellidos);

//Busco si existe alguien con más de $250000 en caja
const existe = clientes.some(cliente => cliente.caja === 250000)
console.log(existe);

//Busco cliente con 35 años de edad
const resultado = clientes.find(cliente => cliente.edad  === 35); 
console.log(resultado);

//Busco obtener el valor total de caja 
const total = clientes.reduce((acc, la) => acc + la.caja, 0)
console.log(total);


//Creo un array  con las distintas alternativas de inversión
let listaInversion = ["Plazo Fijo en $", "Plazo Fijo en USD", "Bonos", "Acciones"];

//Utilizo select para que el cliente vea que tipos de inversiones puede realizar

let select = document.createElement("select"); 
for (let i=0; i<listaInversion.length; i++){ 
    select.innerHTML += `<option value='${i}'> ${listaInversion[i]}</option>`;
}

select.addEventListener('change', function (e) {
    const h3 = document.createElement('h3');
    h3.innerHTML = listaInversion[e.target.value];
    // document.getElementById('tipo').appendChild(h3);
})
document.getElementById('tipo').appendChild(select); 

//Creo clase de objetos para utilizar en aplicacion de inversiones donde a traves de un formulario cada usuario puede ver la lista de deseo de la o las inversion/es que quiere realizar

class Inversion{
    constructor(operacion, currency, monto, plazo){
        this.operacion = operacion;
        this.currency = currency;
        this.monto = monto;
        this.plazo = plazo;
    }
} 

let nombreUsuario;

document.getElementById("formulario-usuario").addEventListener("submit", manejadorFormularioUsuario);

function manejadorFormularioUsuario(e) {
    e.preventDefault();
    nombreUsuario = document.getElementById("user").value;

    let listadodeInversiones = document.getElementById("listadodeInversiones");
    const inversiones = JSON.parse(localStorage.getItem(nombreUsuario));
    if(inversiones == null){
        listadodeInversiones.innerHTML = "<h2>No hay inversiones para mostrar</h2>"
    }else{
        mostrarInversiones(inversiones);
    }
    mostrarPanel();
}

function mostrarInversiones(inversiones) {
    let listadodeInversiones = document.getElementById("listadodeInversiones");
    //vacio el contenedor para que no se duplique
    listadodeInversiones.innerHTML = "";

    inversiones.forEach(inversion => {
        let li = document.createElement("li");
        li.innerHTML = `
        <hr> ${inversion.operacion} - ${inversion.currency} - ${inversion.monto} - ${inversion.plazo} `;
        const botonBorrar = crearBotonEliminar(inversion);
        li.appendChild(botonBorrar);
        listadodeInversiones.appendChild(li);
    });
}

function crearBotonEliminar(inversion) {
    const botonBorrar = document.createElement("button");
    botonBorrar.innerText = "Borrar";
    botonBorrar.addEventListener("click", () =>{
        eliminarInversion(inversion);
    })
    return botonBorrar;
}

function mostrarPanel() {
    const opciones = document.getElementById("opciones");

    opciones.innerHTML =
    `<h3>Bienvenido ${nombreUsuario}</h3>
    <form id="formulario-inversión">
    <input type="text" id="operacion" placeholder="Operación">
    <input type="text" id="moneda" placeholder="Moneda">
    <input type="number" id="monto" placeholder="Monto">
    <input type="number" id="plazo" placeholder="Plazo">
    <input type="submit">Agregar inversión</button>
    </form>`;
    document.getElementById("formulario-inversión").addEventListener("submit", agregarInversion);
}

function agregarInversion(e) {
    e.preventDefault();
    const operacion = document.getElementById("operacion").value;
    const moneda = document.getElementById("moneda").value;
    const monto = document.getElementById("monto").value;
    const plazo = document.getElementById("plazo").value;

    const inversion = new Inversion(operacion, moneda, monto, plazo);

    const inversionesEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));

    if(inversionesEnLocalStorage == null){
        localStorage.setItem(nombreUsuario, JSON.stringify([inversion]));
        mostrarInversiones([inversion]);
    }else{
        inversionesEnLocalStorage.push(inversion);
        localStorage.setItem(nombreUsuario, JSON.stringify(inversionesEnLocalStorage));
        mostrarInversiones(inversionesEnLocalStorage);
    }
    e.target.reset();
}

//las inversiones que borre, las elimino del localStorage para que no se me agregue al nuevo array
function eliminarInversion(inversion) {
    const inversionesEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));
    const nuevoArray = inversionesEnLocalStorage.filter(item => item.operacion != inversion.operacion);
    localStorage.setItem(nombreUsuario, JSON.stringify(nuevoArray));
    mostrarInversiones(nuevoArray);
}