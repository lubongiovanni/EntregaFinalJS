// Colocar Imágenes en el cuerpo del HTML
const URL_JSON = "json/cuadros.json"

$.getJSON( URL_JSON, (response, status) => {

    if ( status !== 'success') {
        throw new Error('error')
    }
    for ( const cuadro of response ) {

        $('.galeria_fotos').prepend(`
            <div class="pic ${ cuadro.clase }">
                <img src="${ cuadro.imagen }" alt="${ cuadro.titulo }">
                <h6> ${ cuadro.stock } </h6>
            </div>
        `)
    }
})

//JS que se oculte y vuelva a aparecer el título general
$( ".titulo_galeria" ).mouseover ( () => {
    $( "h1" ).animate({
        opacity: 0.25,
        height: "toggle"
    }, 2000, function() {
      // Animación completa
    });
});

$( ".titulo_galeria" ).mouseout( () => {
    $( "h1" ).animate({
        opacity: 1,
        display: "flex",
    }, 2000, function() {
      // Animación completa
    });
});

$('.contenedor_cuadros').prepend(`
    <h3 class="nuevo_titulo"> Maricel Peruchini </h3>
`)


