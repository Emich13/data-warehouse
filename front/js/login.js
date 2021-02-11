//Declaro variables

//const { response } = require("express")

var url = 'http://localhost:3000/login'


// Al hacer click en lupa busca Gif
async function submit_login() {
    await document.getElementById('submit_login').addEventListener('click', (event) => {
        event.preventDefault()
        login()
    })
}
// Request a Api y muestro bienvenida
 function login() {
    var mail = document.getElementById('staticEmail2').value
    var pass = document.getElementById('inputPassword2').value;
    const data = { mail, pass };
    console.log(data)

     fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'omit',
        body: JSON.stringify(data)
    })
    //.then(response => response.json())
        .then(response=> console.log(response))
            
}
submit_login()

