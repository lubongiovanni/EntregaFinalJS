// Cuadros de Maricel Peruchini (Lo hecho en el curso de Desarrollo Web):

//Crear Objeto - Personas que se inscriban en el formulario
class Contacto {
    constructor(nombre, telefono, email) {
        this.nombre = nombre.toLowerCase();
        this.telefono = parseInt(telefono);
        this.email = email.toLowerCase();
    }
}

// Lista de contactos almacenados en el Storage
let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

// Para que devuelva la lista de contactos
const getTodo = () => {
    return contactos;
}

// Pushear contactos dentro del Array y lo almacena
const pushear = (contacto) => {
    contactos.push(contacto);
    localStorage.setItem('contactos', JSON.stringify(contactos));
}

// Función que busca el cuadro que se desea
const findOne = (nombre) => {
    nombre = nombre.toLowerCase();
    const contac = contactos.find( contac => contac.nombre === nombre);
    if(!contac){
        throw new Error(`No existe ${nombre}`);
    }
    return contac;
}

// Si se quiere cambiar el número de un contacto, se utiliza lo siguiente:
const telefonoNuevo = (nombre, telefono) => {
    const contac = findOne(nombre);
    contac.telefono = telefono;
}

// D O M 
// Obtener elmentos del DOM
const listaContactos = document.getElementById('lista-contactos');
const formContacto = document.getElementById('formulario');
const inputNombre = document.getElementById('introducirnombre');
const inputTelefono = document.getElementById('introducirtelefono');
const inputEmail = document.getElementById('introduciremail');
const errorMensaje = document.getElementById('errores');

// Agregar un contacto a la lista de contactos para que se vea en el Browser
const renderListaContactos = () => {
    for (let contac of contactos) {
        let itemContacto = document.createElement('li');
        itemContacto.innerHTML = `Se agregó el contacto: ${contac.nombre} <span style="cursor:pointer" id="${contac.nombre}"> X </span>`;
        
        
        listaContactos.appendChild(itemContacto);

        itemContacto.onclick = () => {
            eliminar(contac.nombre);
            document.location.reload();
        }
    }
   
}

renderListaContactos();

// Escuchar el evento submit del formulario
formContacto.addEventListener('submit', (event) => {
    const nombre = inputNombre.value;
    const telefono = inputTelefono.value;
    const email = inputEmail.value;

    const contacto = new Contacto(nombre, telefono, email);

    if ((nombre.length >= 4) & (telefono.length >= 10) & (email.length >= 10)) {
        pushear(contacto); 
    }     
})

const limpiar = document.getElementById('limpiar');

// Ejemplos de Eventos simples al hacer click en un botón o en el espacio a completar de un formulario.

inputNombre.onfocus = () => {
    inputNombre.placeholder = '';
    console.log('Introducir Nombre!');
}

inputTelefono.onfocus = () => {
    inputNombre.placeholder = '';
    console.log('Introducir Teléfono de Contacto!');
}

inputEmail.onfocus = () => {
    inputNombre.placeholder = '';
    console.log('Introducir E-mail de Contacto!');
}

limpiar.onclick = () => {
    console.log('Se limpió el formulario');
}

const eliminar = (nombre) => {
    const persona = findOne(nombre);
    const index = contactos.indexOf(persona);
    contactos.splice( index, 1);
    localStorage.setItem('contactos', JSON.stringify(contactos));

}

const URL_JSON = "json/cuadros.json"

$('#boton').click( () => {
    $.getJSON( URL_JSON, (response, status) => {

        if ( status !== 'success') {
            throw new Error('error')
        }
        for ( const cuadro of response ) {

            $('#contenido').prepend(`
                <div>
                    <!-- OJO si usan localhost que cambian las propiedades -->
                    <h3> ${ cuadro.titulo } </h3>
                    <p> ${ cuadro.stock } </p>
                </div>
            `)
        }
    })
})