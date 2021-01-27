//Declaro variables

var api = 'https://api.giphy.com/v1/gifs/search?'
var api_autocomplete = 'https://api.giphy.com/v1/gifs/search/tags?'
var api_key = 'api_key=LbAHC6eAkm7KWtrPTyjps8Ul4z9eFqmJ'
var specific = '&limit=12&offset=0&rating=g&q='
var specific_tag = '&limit=4&offset=0&rating=g&q='
var tag_container = document.getElementById('tag_container')

// Al hacer click en lupa busca Gif
function setUp() {
    contenedor = document.getElementById('gif_gif')
    var btn = document.getElementById('search')
    btn.addEventListener('click', () => {
        contenedor.innerHTML = '';
        getSearch()
    })
}
setUp()

// Request a Api y muestro Gifs
function getSearch() {
    let input = document.getElementById('text').value
    var url = api + api_key + specific + input

    fetch(url)
        .then(response => response.json())
        .then(function (info) {
            for (let index = 0; index < info.data.length; index++) {
                img = info.data[index].images.downsized_large.url;
                imagen = document.createElement('img');
                imagen.setAttribute('src', img);

                //icons() viene de trending.js
                icons();

                cont = document.getElementById('gif_gif')
                cont.append(div)

                titulo = document.getElementById('titulo-search')
                titulo.innerText = input
            }
        })
}