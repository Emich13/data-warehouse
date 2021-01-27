//Vínculos
const sequelize = require('./conexion.js');
require('dotenv').config()
const { validarUsuario, esAdmin } = require('./authorization.js');
const config = require('./config')

//npm install express
var express = require('express');
var app = express();
app.use(express.static('publica'));

//npm install body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cors
const cors = require('cors');
app.use(cors());

//Helmet
const helmet = require('helmet')
app.use(helmet())
//const rateLimit = require("express-rate-limit");

//npm install jsonwebtoken
var jwt = require('jsonwebtoken');

//npm install express-jwt
var expressJwt = require('express-jwt');

//Protegemos todo menos el /login
app.use(expressJwt({ secret: process.env.jwtClave, algorithms: ['HS256'] }).unless({ path: ["/login", "/registro"] }));

//-------------------------------------Usuarios-----------------------------------//

//Endpoints//

app.post('/registro', registro) //Registrar nuevo usuario
app.post('/login', login) //Login usuario existente


//Queries usuarios
function registro(req, res) {
    var data = req.body;
    if (!data.usuario || !data.nombre || !data.apellido || !data.correo || !data.telefono || !data.direccion_de_envio || !data.pass) {
        res.status(405).send(`No está permitido dejar campos vacios.
            Por favor completa todos los campos y registrate nuevamente!`)
    } else {
        sequelize.query('INSERT INTO usuarios (usuario, nombre, apellido, correo, telefono, direccion_de_envio, pass) VALUES (?,?,?,?,?,?,?)',
            { replacements: [data.usuario, data.nombre, data.apellido, data.correo, data.telefono, data.direccion_de_envio, data.pass] })
            .then(function () {
                res.status(201).send(`${data.nombre}, creaste tu usuario con exito!`)
            }).catch(function () {
                res.status(400).send("Verifica que hayas ingresado todos los datos. Intentalo nuevamente")
            });
    }
}

async function login(req, res) {
    var data = req.body;
    await sequelize.query('SELECT * FROM usuarios WHERE usuario=? AND pass=?',
        { replacements: [data.usuario, data.pass], type: sequelize.QueryTypes.SELECT })
        .then(function (resultado) {
            if (data.usuario == resultado[0].usuario || data.pass == resultado[0].pass) {

                var token = jwt.sign({
                    usuario: data.usuario,
                    rol: resultado[0].rol,
                    direccion: resultado[0].direccion_de_envio
                }, process.env.jwtClave);

                res.status(200).send(token)
                return
            }
        }).catch(function () {
            res.status(400).send("Usuario y/o pass son incorrectos o vacios. Si no tiene una cuenta debe registrarse")
        })
}



//------------------------------Conexión al servidor---------------------------//
app.listen(3000, function () {
    console.log('El servidor express corre en el puerto 3000');
});